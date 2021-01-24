import { createSelector } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import bbox from "@turf/bbox";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { RootState } from "../rootReducer";
import { MediaDocument } from "../../types/common/media";

type ExperienceRef = {
  name: string;
  id: string;
};

export const selectCurrentExperience: Selector<
  RootState,
  ExperienceSnapshotData | undefined
> = (state) =>
  state.experience.selectedExperience
    ? selectExperience(state, state.experience.selectedExperience)
    : undefined;

export const selectMyExperiences: Selector<RootState, ExperienceRef[]> = (
  state
) => {
  return Object.values(state.experience.experiences)?.map((e) => ({
    name: e.data.name,
    // eslint-disable-next-line no-underscore-dangle
    id: e.data._id,
  }));
};

export const selectFeaturedExperiences: Selector<
  RootState,
  ExperienceRefData[]
> = (state) => state.experience.featuredExperiences;

export const selectExperiences: Selector<
  RootState,
  Record<string, ExperienceSnapshotData>
> = (state) => {
  return state.experience.experiences;
};

export const selectMedia: Selector<RootState, Record<string, MediaDocument>> = (
  state
) => state.experience.media;

export const selectExperience = createSelector(
  [selectExperiences, selectMedia, (_: RootState, id: string) => id],
  (experiences, media, id) => {
    const experience = experiences[id];
    if (!experience) return undefined;
    const geojson = {
      type: "FeatureCollection",
      features: experience.data.pointOfInterests?.map((p) => ({
        type: "Feature",
        geometry: p.location,
      })),
    };
    const bb = bbox(geojson);
    return experience
      ? {
          ...experience,
          data: {
            ...experience.data,
            pointOfInterests: experience.data.pointOfInterests?.map(
              (place) => ({
                ...place,
                media: place.media.map((m) => media[m._id]),
              })
            ),
          },
          bbox: bb,
        }
      : undefined;
  }
);

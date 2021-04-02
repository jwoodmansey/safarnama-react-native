import { createSelector } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import bbox from "@turf/bbox";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { RootState } from "../rootReducer";
import { MediaDocument } from "../../types/common/media";
import { PlaceType } from "../../types/common/point-of-interest";

export const selectCurrentExperience: Selector<
  RootState,
  ExperienceSnapshotData | undefined
> = (state) =>
  state.experience.selectedExperience
    ? selectExperience(state, state.experience.selectedExperience)
    : undefined;

export const selectMyExperiences: Selector<
  RootState,
  ExperienceSnapshotData[]
> = (state) =>
  Object.values(state.experience.experiences)?.filter((e) => e.played);

export const selectFeaturedExperiences: Selector<
  RootState,
  ExperienceRefData[]
> = (state) => state.experience.featuredExperiences;

export const selectAllKeys = createSelector(
  [selectCurrentExperience],
  (experience) =>
    experience?.data.pointOfInterests?.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.type.name]: curr.type,
      };
    }, {} as Record<string, PlaceType>)
);
export const selectIsKeyModalVisible: Selector<RootState, boolean> = (state) =>
  state.experience.isKeyModalVisible === true;
export const selectKeyModal = createSelector(
  [selectIsKeyModalVisible, selectAllKeys],
  (isVisible, keys) => ({
    isVisible,
    keys: keys ? Object.values(keys) : [],
  })
);

export const selectExperiences: Selector<
  RootState,
  Record<string, ExperienceSnapshotData>
> = (state) => state.experience.experiences;

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

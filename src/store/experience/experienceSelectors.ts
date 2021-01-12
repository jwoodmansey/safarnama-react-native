import { createSelector } from "@reduxjs/toolkit";
import { Selector } from "react-redux";
import bbox from "@turf/bbox";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { RootState } from "../configure";

type ExperienceRef = {
  name: string;
  id: string;
};

export const selectCurrentExperience: Selector<
  RootState,
  ExperienceSnapshotData | undefined
> = (state) =>
  state.experience.selectedExperience
    ? state.experience.experiences[state.experience.selectedExperience]
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

export const selectExperience = createSelector(
  [selectExperiences, (_: RootState, id: string) => id],
  (experiences, id) => {
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
          bbox: bb,
        }
      : undefined;
  }
);

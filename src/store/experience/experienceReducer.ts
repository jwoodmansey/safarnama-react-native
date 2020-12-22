/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { PointOfInterestDocument } from "../../types/common/point-of-interest";

export type LoadExperience = PayloadAction<{ id: string }>;

type LoadedExperiences = PayloadAction<{
  experience: ExperienceSnapshotData;
}>;

type LoadedFeaturedExperiences = PayloadAction<{
  featuredExperiences: ExperienceRefData[];
}>;

type ExperienceState = {
  experiences: Record<string, ExperienceSnapshotData>;
  selectedPlace: PointOfInterestDocument | undefined;
  featuredExperiences: ExperienceRefData[];
  selectedExperience: string | undefined;
};

const experienceReducer = createSlice({
  name: "experience",
  initialState: {
    experiences: {},
    selectedPlace: undefined,
    selectedExperience: undefined,
    featuredExperiences: [],
  } as ExperienceState,
  reducers: {
    loadExperience: (_, __: LoadExperience) => {},
    loadedExperience: (state, action: LoadedExperiences) => {
      // eslint-disable-next-line no-underscore-dangle
      state.experiences[action.payload.experience.data._id] =
        action.payload.experience;
      // Alert.alert(JSON.stringify(state.experiences))
    },
    setSelectedExperience: (state, action: LoadExperience) => {
      state.selectedExperience = action.payload.id;
    },
    setSelectedPlace: (
      state,
      action: PayloadAction<PointOfInterestDocument>
    ) => {
      state.selectedPlace = action.payload;
    },
    loadFeaturedExperiences: () => {},
    loadedFeaturedExperiences: (state, action: LoadedFeaturedExperiences) => {
      state.featuredExperiences = action.payload.featuredExperiences;
    },
  },
});

export const {
  setSelectedExperience,
  loadExperience,
  loadedExperience,
  setSelectedPlace,
  loadFeaturedExperiences,
  loadedFeaturedExperiences,
} = experienceReducer.actions;

export default experienceReducer.reducer;

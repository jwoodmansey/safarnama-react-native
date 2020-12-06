/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { PointOfInterestDocument } from "../../types/common/point-of-interest";

type LoadedExperiences = PayloadAction<{
  experiences: ExperienceSnapshotData[];
}>;

type LoadedFeaturedExperiences = PayloadAction<{
  featuredExperiences: ExperienceRefData[];
}>;

type ExperienceState = {
  experiences: ExperienceSnapshotData[];
  selectedPlace: PointOfInterestDocument | undefined;
  featuredExperiences: ExperienceRefData[];
};

const experienceReducer = createSlice({
  name: "experience",
  initialState: {
    experiences: [],
    selectedPlace: undefined,
    featuredExperiences: [],
  } as ExperienceState,
  reducers: {
    loadExperiences: () => {},
    loadedExperiences: (state, action: LoadedExperiences) => {
      state.experiences = action.payload.experiences;
      console.log(action.payload.experiences);
      // Alert.alert(JSON.stringify(state.experiences))
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
  loadExperiences,
  loadedExperiences,
  setSelectedPlace,
  loadFeaturedExperiences,
  loadedFeaturedExperiences,
} = experienceReducer.actions;

export default experienceReducer.reducer;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { MediaDocument } from "../../types/common/media";
import { PointOfInterestDocument } from "../../types/common/point-of-interest";

export type LoadExperience = PayloadAction<{ id: string }>;

type LoadedExperiences = PayloadAction<{
  experience: ExperienceSnapshotData;
}>;
type DownloadedMedia = PayloadAction<{
  media: Record<string, MediaDocument>;
}>;

type LoadedFeaturedExperiences = PayloadAction<{
  featuredExperiences: ExperienceRefData[];
}>;

type ExperienceState = {
  experiences: Record<string, ExperienceSnapshotData>;
  selectedPlace: PointOfInterestDocument | undefined;
  featuredExperiences: ExperienceRefData[];
  selectedExperience: string | undefined;
  media: Record<string, MediaDocument>;
};

const experienceReducer = createSlice({
  name: "experience",
  initialState: {
    experiences: {},
    selectedPlace: undefined,
    selectedExperience: undefined,
    featuredExperiences: [],
    media: {},
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
      state.selectedPlace = undefined;
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
    downloadExperienceMedia: (state, action: LoadExperience) => {},
    downloadedMedia: (state, action: DownloadedMedia) => {
      state.media = {
        ...state.media,
        ...action.payload.media,
      };
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
  downloadExperienceMedia,
  downloadedMedia,
} = experienceReducer.actions;

export default experienceReducer.reducer;

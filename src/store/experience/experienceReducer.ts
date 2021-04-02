/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAG } from "../../config";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { MediaDocument } from "../../types/common/media";
import { PointOfInterestDocument } from "../../types/common/point-of-interest";
import { getMediaFromExperienceData } from "../mediaService";

export type LoadExperience = PayloadAction<{ id: string }>;

type LoadedExperiences = PayloadAction<{
  experience: ExperienceSnapshotData;
}>;
type DownloadedMedia = PayloadAction<{
  media: Record<string, MediaDocument>;
  experienceId: string;
}>;
type LoadedFeaturedExperiences = PayloadAction<{
  featuredExperiences: ExperienceRefData[];
}>;
type RemovedExperience = PayloadAction<{
  id: string;
  removedMedia: string[];
}>;

type ToggleKeyModal = PayloadAction<boolean>;

type ExperienceState = {
  experiences: Record<string, ExperienceSnapshotData>;
  selectedPlace: PointOfInterestDocument | undefined;
  featuredExperiences: ExperienceRefData[];
  selectedExperience: string | undefined;
  media: Record<string, MediaDocument>;
  isKeyModalVisible?: boolean;
  isDownloading?: boolean;
};

const experienceReducer = createSlice({
  name: "experience",
  initialState: {
    experiences: {},
    selectedPlace: undefined,
    selectedExperience: undefined,
    featuredExperiences: [],
    media: {},
    isKeyModalVisible: false,
    isDownloading: false,
  } as ExperienceState,
  reducers: {
    loadExperience: (_, __: LoadExperience) => {},
    loadedExperience: (state, action: LoadedExperiences) => {
      state.experiences[action.payload.experience.data._id] = {
        ...state.experiences[action.payload.experience.data._id],
        ...action.payload.experience,
      };
      const newMedia = Object.values(
        getMediaFromExperienceData(action.payload.experience)
      ).filter((m) => state.media[m._id] === undefined);
      state.media = {
        ...state.media,
        ...newMedia.reduce((acc, cur) => {
          acc[cur._id] = cur;
          return acc;
        }, {} as Record<string, MediaDocument>),
      };
    },
    setSelectedExperience: (state, action: LoadExperience) => {
      state.selectedExperience = action.payload.id;
      state.experiences[action.payload.id] = {
        ...state.experiences[action.payload.id],
        played: true,
      };
      state.selectedPlace = undefined;
    },
    setSelectedPlace: (
      state,
      action: PayloadAction<PointOfInterestDocument>
    ) => {
      state.selectedPlace = action.payload;
    },
    toggleKeyModal: (state, action: ToggleKeyModal) => {
      state.isKeyModalVisible = action.payload;
    },
    loadFeaturedExperiences: () => {},
    loadedFeaturedExperiences: (state, action: LoadedFeaturedExperiences) => {
      state.featuredExperiences = action.payload.featuredExperiences.filter(
        (e) => e.metaData.tags?.includes(TAG)
      );
    },
    downloadExperienceMedia: (state, action: LoadExperience) => {
      state.isDownloading = true;
    },
    downloadedMedia: (state, action: DownloadedMedia) => {
      state.media = {
        ...state.media,
        ...action.payload.media,
      };
      state.experiences[action.payload.experienceId] = {
        ...state.experiences[action.payload.experienceId],
        downloaded: true,
      };
      state.isDownloading = false;
    },
    errorDownloadingMedia: (state) => {
      state.isDownloading = false;
    },
    removeExperience: (_, __: LoadExperience) => {},
    removedExperience: (state, action: RemovedExperience) => {
      const experiences = { ...state.experiences };
      delete experiences[action.payload.id];
      state.experiences = experiences;
      const media = { ...state.media };
      action.payload.removedMedia.forEach((id) => {
        delete media[id];
      });
      state.media = media;
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
  errorDownloadingMedia,
  toggleKeyModal,
  removeExperience,
  removedExperience,
} = experienceReducer.actions;

export default experienceReducer.reducer;

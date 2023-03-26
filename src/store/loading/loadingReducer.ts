/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  downloadedMedia,
  downloadExperienceMedia,
  errorDownloadingMedia,
} from "../experience/experienceReducer";

export type StartLoadingPayloadAction = PayloadAction<any>;

type LoadingState = {
  isLoading: boolean;
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  } as LoadingState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: LoadingState) => {
      state.isLoading = true;
    };
    const stopLoading = (state: LoadingState) => {
      state.isLoading = false;
    };

    builder.addCase(downloadExperienceMedia, startLoading);
    builder.addCase(downloadedMedia, stopLoading);
    builder.addCase(errorDownloadingMedia, stopLoading);
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

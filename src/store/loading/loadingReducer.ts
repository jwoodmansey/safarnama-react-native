/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type OnboardingState = {
  completed: boolean;
};

const onboardingSlide = createSlice({
  name: "onboarding",
  initialState: {
    completed: false,
  } as OnboardingState,
  reducers: {
    complete: (state) => {
      state.completed = true;
    },
  },
});

export const { complete } = onboardingSlide.actions;

export default onboardingSlide.reducer;

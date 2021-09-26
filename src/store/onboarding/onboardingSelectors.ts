import { Selector } from "react-redux";
import { RootState } from "../rootReducer";

// eslint-disable-next-line import/prefer-default-export
export const selectIsOnboardingComplete: Selector<RootState, boolean> = (
  state
) => state.onboarding.completed;

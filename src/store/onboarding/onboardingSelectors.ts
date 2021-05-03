import { Selector } from "react-redux";
import { RootState } from "../rootReducer";

export const selectIsOnboardingComplete: Selector<RootState, boolean> = (
  state
) => state.onboarding.completed;

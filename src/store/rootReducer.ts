import { combineReducers } from "@reduxjs/toolkit";
import experienceReducer from "./experience/experienceReducer";
import loadingReducer from "./loading/loadingReducer";
import onboardingReducer from "./onboarding/onboardingReducer";

const rootReducer = combineReducers({
  experience: experienceReducer,
  loading: loadingReducer,
  onboarding: onboardingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootDispatch = typeof rootReducer.dispatch;

export default rootReducer;

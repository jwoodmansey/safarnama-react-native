import { combineReducers } from "@reduxjs/toolkit";
import experienceReducer from "./experience/experienceReducer";
import loadingReducer from "./loading/loadingReducer";
import onboardingReducer from "./onboarding/onboardingReducer";
import settingsReducer from "./settings/settingsReducer";

const rootReducer = combineReducers({
  experience: experienceReducer,
  loading: loadingReducer,
  onboarding: onboardingReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootDispatch = typeof rootReducer.dispatch;

export default rootReducer;

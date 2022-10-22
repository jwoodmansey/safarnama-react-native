import { RootState } from "../rootReducer";

export const selectLanguage = (store: RootState) => store.settings.lng;
export const selectQuickExperienceSwitching = (store: RootState) =>
  store.settings.quickExperienceSwitching;

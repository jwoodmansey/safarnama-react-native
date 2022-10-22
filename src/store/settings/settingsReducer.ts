/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resources } from "../../i18n/config";

export type LanguageSetting = keyof typeof resources | undefined;

type SettingsState = {
  lng?: LanguageSetting;
  quickExperienceSwitching?: boolean;
};

const initialState: SettingsState = {
  lng: undefined,
  quickExperienceSwitching: undefined,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageSetting>) => {
      state.lng = action.payload;
    },
    setQuickExperienceSwitching: (state, action: PayloadAction<boolean>) => {
      state.quickExperienceSwitching = action.payload;
    },
  },
});

export const { changeLanguage, setQuickExperienceSwitching } =
  settingsSlice.actions;

export default settingsSlice.reducer;

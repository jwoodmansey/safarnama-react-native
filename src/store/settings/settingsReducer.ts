/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resources } from "../../i18n/config";

export type LanguageSetting = keyof typeof resources | undefined;

type SettingsState = {
  lng?: LanguageSetting;
  hidePermissionsBanner: boolean;
};

const initialState: SettingsState = {
  lng: undefined,
  hidePermissionsBanner: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageSetting>) => {
      state.lng = action.payload;
    },
    skippedPermissionsBanner: (state) => {
      state.hidePermissionsBanner = true;
    },
  },
});

export const { changeLanguage, skippedPermissionsBanner } =
  settingsSlice.actions;

export default settingsSlice.reducer;

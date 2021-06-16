/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resources } from "../../i18n/config";

export type StartLoadingPayloadAction = PayloadAction<any>;
export type LanguageSetting = keyof typeof resources | undefined;

type SettingsState = {
  lng?: LanguageSetting;
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    lng: undefined,
  } as SettingsState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageSetting>) => {
      state.lng = action.payload;
    },
  },
});

export const { changeLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;

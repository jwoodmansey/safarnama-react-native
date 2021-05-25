import i18n from "i18next";
import { initReactI18next, Namespace, TFunction } from "react-i18next";
import { Platform, NativeModules, Alert } from "react-native";
import { TAG } from "../config";
import en from "./en/index.json";
import cy from "./cy/index.json";

// see https://github.com/i18next/i18next/issues/1504#issuecomment-742727015 for typesafety
export const resources = {
  en: {
    ...en,
    glossary: {
      ...en.glossary,
      appName:
        TAG === "Ports Past and Present"
          ? "Ports Past and Present"
          : "Safarnama",
    },
  },
  cy: {
    ...cy,
    glossary: {
      ...cy.glossary,
      appName:
        TAG === "Ports Past and Present" ? "Lleoedd Porthladd" : "Safarnama",
    },
  },
};

export const locale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

Alert.alert(locale);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: locale ? locale.substring(0, 2) : "en",
    fallbackLng: "en", // use en if detected lng is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

/**
 * Use useTranlation hook in components!
 */
export const translateOutsideComponent: TFunction<Namespace> = i18n.t.bind(
  i18n
);

export default i18n;

import i18n from "i18next";
import { initReactI18next, Namespace, TFunction } from "react-i18next";
import { Platform, NativeModules } from "react-native";
import { TAG } from "../config";
import en from "./en/index.json";
import cy from "./cy/index.json";

// see https://github.com/i18next/i18next/issues/1504#issuecomment-742727015 for typesafety
export const resources = {
  en: {
    ...en,
    about: {
      ...en.about,
      projectName:
        TAG === "Ports Past and Present"
          ? "Ports, Past and Present"
          : "Safarnama",
      aboutFull:
        TAG === "Ports Past and Present"
          ? "<0>A project led by University College Cork in partnership with Aberystwyth University, the University of Wales Trinity St David and Wexford County Council examining the cultural heritage of the <0>ports in the Irish sea basin</0>. Funded by the European Regional Development Fund through the <1>Ireland Wales Cooperation programme</1>.</0>"
          : "<0>With Safarnama you can download and explore curated cultural heritage experiences for Delhi, India: 'Gadhr se Azaadi, (Rebellion to Freedom), 1857-1947' and 'Delhi Partition City'. Users receive a push notification when they are close to a place of interest with media attached to it. Explore Delhi's heritage as part of your everyday commute or use the app to explore Delhi as a visitor.</0>",
    },
    glossary: {
      ...en.glossary,
      appName: TAG === "Ports Past and Present" ? "Port Places" : "Safarnama",
    },
  },
  cy: {
    ...cy,
    about: {
      ...cy.about,
      projectName:
        TAG === "Ports Past and Present"
          ? "Porthladdoedd, Ddoe a Heddiw"
          : "Safarnama",
      aboutFull:
        TAG === "Ports Past and Present"
          ? "<0>Prosiect dan arweiniad Coleg Prifysgol Corc, mewn cydweithrediad â Phrifysgol Aberystwyth, Prifysgol Cymru y Drindod Dewi Sant a chyngor sir Loch Garman (Wexford), sy’n archwilio treftadaeth ddiwylliannol <1>5 porthladd o amgylch Môr Iwerddon</1>. Noddir gan Gronfa Datblygu Rhanbarthol Ewrop trwy <2>Raglen Iwerddon Cymru.</2></0>"
          : undefined,
    },
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
export const translateOutsideComponent: TFunction<Namespace> =
  i18n.t.bind(i18n);

export default i18n;

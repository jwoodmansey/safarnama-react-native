import i18n from "i18next";
import { initReactI18next, Namespace, TFunction } from "react-i18next";
import { Platform, NativeModules } from "react-native";
import { TAG } from "../config";
import en from "./en/index.json";
import cy from "./cy/index.json";

const SAFARNAMA_EN = {
  about: {
    ...en.about,
    projectName: "Safarnama",
    aboutFull:
      "<0>With Safarnama you can download and explore curated cultural heritage experiences for Delhi, India: 'Gadhr se Azaadi, (Rebellion to Freedom), 1857-1947' and 'Delhi Partition City'. Users receive a push notification when they are close to a place of interest with media attached to it. Explore Delhi's heritage as part of your everyday commute or use the app to explore Delhi as a visitor.</0>",
  },
  glossary: {
    ...en.glossary,
    appName: "Safarnama",
  },
};

const PPP_EN = {
  about: {
    ...en.about,
    projectName: "Ports Past and Present",
    aboutFull:
      "<0>A project led by University College Cork in partnership with Aberystwyth University, the University of Wales Trinity St David and Wexford County Council examining the cultural heritage of the <0>ports in the Irish sea basin</0>. Funded by the European Regional Development Fund through the <1>Ireland Wales Cooperation programme</1>.</0>",
  },
  glossary: {
    ...en.glossary,
    appName: "Ports Past and Present",
  },
};

const WORDSWORTH_EN = {
  about: {
    ...en.about,
    projectName: "Dorothy Wordsworth Walks",
    aboutFull:
      "<0>With this app you can download and explore curated cultural heritage experiences for Dorothy Wordsworth Walks.</0>",
  },
  glossary: {
    ...en.glossary,
    appName: "Dorothy Wordsworth Walks",
  },
};

const WEAVERS_OF_WONDER_EN = {
  about: {
    ...en.about,
    projectName: "Weavers of Wonder",
    aboutFull:
      "<0>Come with us into the hustle and bustle of the street markets of West Bengal; there are pungent aromas and bright colours everywhere, but in this outing no one is going to try to sell you anything. You are going to be invisible, peacefully looking over our volunteers’ shoulders as they seek out the most ethical and local raw materials and equipment for Weavers of Wonders crafters to use to make their products. This is the first App to create for craft the provenance that has always been on show and factored into the price of the Fine Art on sale at auction houses such as Sotheby’s and Christie’s in London, New York and Paris. We want you to be able to visualise and trace back as much of the ecosystem of the craft product from West Bengal that you may soon hold in your hands. We want you to be able to see the numbers of people that your purchase is going to benefit, not only the crafter her- or himself, not only their family even, but a whole network of small traders and manufacturers in West Bengal and in India as a whole. If you have any suggestions about how we can improve this App, please get in touch: magedera@yahoo.com</0>",
  },
  glossary: {
    ...en.glossary,
    appName: "Weavers of Wonder",
  },
};

const tagMap = {
  Safarnama: SAFARNAMA_EN,
  "Ports Past and Present": PPP_EN,
  "Dorothy Wordsworth Walks": WORDSWORTH_EN,
  "Weavers of Wonder": WEAVERS_OF_WONDER_EN,
};

// see https://github.com/i18next/i18next/issues/1504#issuecomment-742727015 for typesafety
export const resources = {
  en: {
    ...en,
    ...tagMap[TAG],
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

export const locale: string =
  (Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier
  )?.replace("_", "-") || "en-GB";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: "v3",
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

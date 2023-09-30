import { getBundleId } from "react-native-device-info";
import { Source } from "react-native-fast-image";

export const BASE_URL = "https://safarnama.lancs.ac.uk/";
export const API_BASE_URL = `${BASE_URL}/api`;

type Tags = "Ports Past and Present" | "Safarnama" | "Dorothy Wordsworth Walks";

const getTag = (): Tags => {
  switch (getBundleId()) {
    case "com.safarnama.safarnama.wordsworth":
    case "com.safarnamasoftware.wordsworth":
      return "Dorothy Wordsworth Walks";
    case "com.safarnama.safarnama.portspastpresent":
    case "eu.portspastpresent.app":
      return "Ports Past and Present";
    default:
      return "Safarnama";
  }
};

export const TAG = getTag();

const SAFARNAMA_LOGO = require("../assets/images/master_logo.png");
const PPP_LOGO = require("../assets/images/ppp_master_logo.png");
const WORDSWORTH_LOGO = require("../assets/images/wordsworth_logo.png");

const config: Record<
  Tags,
  { privacyUrl: string; logo: Source; showProjectName: boolean }
> = {
  Safarnama: {
    privacyUrl: "https://safarnama.lancs.ac.uk/privacy/app",
    logo: SAFARNAMA_LOGO,
    showProjectName: false,
  },
  "Ports Past and Present": {
    privacyUrl: "https://portspastpresent.eu/app-privacy",
    logo: PPP_LOGO,
    showProjectName: true,
  },
  "Dorothy Wordsworth Walks": {
    privacyUrl: "https://safarnama.lancs.ac.uk/privacy/app",
    logo: WORDSWORTH_LOGO,
    showProjectName: false,
  },
};

export const APP_CONFIG = config[TAG];

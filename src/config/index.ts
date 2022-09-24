import { getBundleId } from "react-native-device-info";
import { Source } from "react-native-fast-image";

export const API_BASE_URL = "https://safarnama.lancs.ac.uk/api";

type Tags = "Ports Past and Present" | "Safarnama";

const getTag = (): Tags => {
  switch (getBundleId()) {
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
};

export const APP_CONFIG = config[TAG];
export const PRIVACY_URL = APP_CONFIG.privacyUrl;

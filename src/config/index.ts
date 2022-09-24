import { getBundleId } from "react-native-device-info";

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

const config: Record<Tags, { privacyUrl: string }> = {
  "Ports Past and Present": {
    privacyUrl: "https://portspastpresent.eu/app-privacy",
  },
  Safarnama: {
    privacyUrl: "https://safarnama.lancs.ac.uk/privacy/app",
  },
};

export const PRIVACY_URL = config[TAG].privacyUrl;

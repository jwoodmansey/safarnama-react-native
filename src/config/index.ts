import { getBundleId } from "react-native-device-info";

export const API_BASE_URL = "https://safarnama.lancs.ac.uk/api";
// export const TAG = "Delhi";
export const TAG =
  getBundleId() === "com.safarnama.safarnama.portspastpresent" ||
  getBundleId() === "eu.portspastpresent.app"
    ? "Ports Past and Present"
    : undefined;

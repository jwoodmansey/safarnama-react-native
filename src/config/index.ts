import { getBundleId } from "react-native-device-info";

export const API_BASE_URL = "http://safarnama.lancs.ac.uk/api";
// export const TAG = "Delhi";
export const TAG =
  getBundleId() === "eu.portspastpresent.app"
    ? "Ports Past and Present"
    : undefined;

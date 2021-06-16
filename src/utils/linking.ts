import { Linking } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

// eslint-disable-next-line import/prefer-default-export
export const openInAppBrowser = async (url: string) => {
  if (await InAppBrowser.isAvailable()) {
    return InAppBrowser.open(url);
  }
  return Linking.openURL(url);
};

import { Dimensions, Platform } from "react-native";

export const smallPhoneMax = 375;
export const mediumPhoneMax = 410;

// Android scales differently
export const smallPhoneMaxAndroid = 380;
export const mediumPhoneMaxAndroid = 420;

export function getDeviceSizeType() {
  const { width } = Dimensions.get("window");
  if (Platform.OS === "android") {
    if (width < smallPhoneMaxAndroid) {
      return "SMALL";
    }
    if (width < mediumPhoneMaxAndroid) {
      return "MEDIUM";
    }
  } else {
    if (width < smallPhoneMax) {
      return "SMALL";
    }
    if (width < mediumPhoneMax) {
      return "MEDIUM";
    }
  }
  return "LARGE";
}

export function deviceValue<T>(
  smallPhone: T,
  mediumPhone: T,
  largePhone?: T
): T {
  switch (getDeviceSizeType()) {
    case "SMALL":
      return smallPhone;
    case "MEDIUM":
      return mediumPhone;
    default:
    case "LARGE":
      return largePhone || mediumPhone;
  }
}

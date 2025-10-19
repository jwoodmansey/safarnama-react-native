import { NavigationContainerRef } from "@react-navigation/native";
import { RefObject } from "react";
import { DrawerStackNavigationProp } from "../types/nav/root";

import { createNavigationContainerRef } from "@react-navigation/native";
export const navigationRef =
  createNavigationContainerRef<DrawerStackNavigationProp>();

export function navigate<RouteName extends keyof DrawerStackNavigationProp>(
  ...args: RouteName extends unknown
    ? undefined extends DrawerStackNavigationProp[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: DrawerStackNavigationProp[RouteName]]
      : [screen: RouteName, params: DrawerStackNavigationProp[RouteName]]
    : never
) {
  // if (navigationRef.isReady()) {
  navigationRef.navigate(...args);
  // }
}

export function goBack() {
  navigationRef.current?.goBack();
}

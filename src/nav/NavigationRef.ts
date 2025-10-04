import { NavigationContainerRef } from "@react-navigation/native";
import { RefObject } from "react";
import { RootStackNavigationProp } from "../types/nav/root";

import { createNavigationContainerRef } from "@react-navigation/native";
export const navigationRef =
  createNavigationContainerRef<RootStackNavigationProp>();

export function navigate<RouteName extends keyof RootStackNavigationProp>(
  ...args: RouteName extends unknown
    ? undefined extends RootStackNavigationProp[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: RootStackNavigationProp[RouteName]]
      : [screen: RouteName, params: RootStackNavigationProp[RouteName]]
    : never
) {
  // if (navigationRef.isReady()) {
  navigationRef.navigate(...args);
  // }
}

export function goBack() {
  navigationRef.current?.goBack();
}

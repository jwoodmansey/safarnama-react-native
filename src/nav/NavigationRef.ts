import { NavigationContainerRef } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { createRef, RefObject } from "react";
import { RootStackNavigationProp } from "../types/nav/root";

export const navigationRef: RefObject<
  NavigationContainerRef<RootStackNavigationProp>
> = createRef();

export function navigate(
  name: keyof RootStackNavigationProp,
  params?: StackNavigationProp<RootStackNavigationProp>
) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

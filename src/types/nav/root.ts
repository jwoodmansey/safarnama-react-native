import { NavigatorScreenParams } from "@react-navigation/native";
import { ExperienceManagementProp } from "./experienceManagement";
import { AddExperienceProp } from "./addExperience";
import { MapNaviationProp } from "./map";

export type RootStackNavigationProp = {
  Drawer: NavigatorScreenParams<DrawerStackNavigationProp>;
  OnboardingScreen: undefined;
};

export type DrawerStackNavigationProp = {
  MapScreen: NavigatorScreenParams<MapNaviationProp>;
  ExperienceManagement: NavigatorScreenParams<ExperienceManagementProp>;
  AddExperience: NavigatorScreenParams<AddExperienceProp>;
  Licenses: undefined;
  About: undefined;
  Privacy: undefined;
  Language: undefined;
};

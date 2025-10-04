import { NavigatorScreenParams } from "@react-navigation/native";
import { ExperienceManagementProp } from "./experienceManagement";
import { AddExperienceProp } from "./addExperience";

export type RootStackNavigationProp = {
  MapScreen: undefined;
  ExperienceManagement: NavigatorScreenParams<ExperienceManagementProp>;
  AddExperience: NavigatorScreenParams<AddExperienceProp>;
  Licenses: undefined;
  About: undefined;
  Privacy: undefined;
  Language: undefined;
  OnboardingScreen: undefined;
};

import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

import { ExperienceRefData } from "../common/experience";

import { MediaDocument } from "../common/media";
import { PointOfInterestDocument } from "../common/point-of-interest";

export type MapNaviationProp = {
  MapScreen: undefined;
  PDFScreen: { media: MediaDocument };
  ImageScreen: { media: MediaDocument };
  PlaceListScreen: undefined;
  ViewPlaceScreen: {
    place?: PointOfInterestDocument;
    placeId: string;
    name: string;
  };
};

export type ExperienceManagementProp = {
  ManageExperiencesScreen: undefined;
  ExperienceDetailsScreen: {
    experience?: ExperienceRefData;
    experienceId?: string;
  };
};
export type AddExperienceProp = {
  FeaturedExperienceScreen: undefined;
  ExperienceDetailsScreen: {
    experience?: ExperienceRefData;
    experienceId?: string;
  };
  ScanQRCodeScreen: undefined;
};

export type RootStackNavigationProp = {
  Map: NavigatorScreenParams<MapNaviationProp>;
  ExperienceManagement: NavigatorScreenParams<ExperienceManagementProp>;
  AddExperience: NavigatorScreenParams<AddExperienceProp>;
  Licenses: undefined;
  About: undefined;
  Privacy: undefined;
  Language: undefined;
  OnboardingScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackNavigationProp> =
  StackScreenProps<RootStackNavigationProp, T>;

export type ExperienceNavigationScreen<
  Screen extends keyof ExperienceManagementProp
> = React.FC<
  CompositeScreenProps<
    StackScreenProps<ExperienceManagementProp, Screen>,
    RootStackScreenProps<keyof RootStackNavigationProp>
  >
>;

export type MapNavigationScreen<Screen extends keyof MapNaviationProp> =
  React.FC<
    CompositeScreenProps<
      StackScreenProps<MapNaviationProp, Screen>,
      RootStackScreenProps<keyof RootStackNavigationProp>
    >
  >;

export type AddExperienceNavigationScreen<
  Screen extends keyof AddExperienceProp
> = React.FC<
  CompositeScreenProps<
    StackScreenProps<AddExperienceProp, Screen>,
    RootStackScreenProps<keyof RootStackNavigationProp>
  >
>;

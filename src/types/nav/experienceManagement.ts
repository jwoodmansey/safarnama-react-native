import { ExperienceRefData } from "../common/experience";

export type ExperienceManagementProp = {
  FeaturedExperienceScreen: {};
  ExperienceDetailsScreen: {
    experience?: ExperienceRefData;
    experienceId?: string;
  };
  ScanQRCodeScreen: {};
};

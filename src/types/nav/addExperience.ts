import { ExperienceRefData } from "../common/experience";

export type AddExperienceProp = {
  FeaturedExperienceScreen: {};
  ExperienceDetailsScreen: {
    experience?: ExperienceRefData;
    experienceId?: string;
  };
  ScanQRCodeScreen: {};
};

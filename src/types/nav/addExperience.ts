import { ExperienceData, ExperienceRefData } from "../common/experience";

export type AddExperienceProp = {
  FeaturedExperienceScreen: {};
  ExperienceDetailsScreen: {
    experience?: ExperienceRefData | ExperienceData;
    experienceId?: string;
  };
  ScanQRCodeScreen: {};
};

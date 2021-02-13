import { ExperienceData, ExperienceRefData } from "../common/experience";

export type ExperienceManagementProp = {
  ManageExperiencesScreen: {};
  ExperienceDetailsScreen: {
    experience?: ExperienceRefData | ExperienceData;
    experienceId?: string;
  };
};

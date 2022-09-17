import { ExperienceRefData } from "../common/experience";

export type ExperienceManagementProp = {
  ManageExperiencesScreen: {};
  ExperienceDetailsScreen: {
    experience?: ExperienceRefData;
    experienceId?: string;
  };
};

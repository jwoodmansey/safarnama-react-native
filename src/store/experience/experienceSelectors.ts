import { Selector } from "react-redux";
import { ExperienceRefData } from "../../types/common/experience";
import { RootState } from "../configure";

type ExperienceRef = {
  name: string;
  id: string;
};

// eslint-disable-next-line import/prefer-default-export
export const selectExperiences: Selector<RootState, ExperienceRef[]> = (
  state
) => {
  return state.experience.experiences?.map((e) => ({
    name: e.data.name,
    // eslint-disable-next-line no-underscore-dangle
    id: e._id,
  }));
};

export const selectFeaturedExperiences: Selector<
  RootState,
  ExperienceRefData[]
> = (state) => state.experience.featuredExperiences;

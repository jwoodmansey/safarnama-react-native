import React, { useEffect } from "react";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { loadFeaturedExperiences } from "../../../store/experience/experienceReducer";
import { selectFeaturedExperiences } from "../../../store/experience/experienceSelectors";
import { ExperienceRefData } from "../../../types/common/experience";
import FeaturedExperienceItem from "../components/FeaturedExperienceItem";
import FeaturedHeader from "../components/FeaturedHeader";

const FeaturedExperiencesScreen: React.FC = () => {
  const dispatch = useDispatch();
  const featuredExperiences = useSelector(selectFeaturedExperiences);
  useEffect(() => {
    dispatch(loadFeaturedExperiences());
  }, [dispatch]);
  const renderItem: ListRenderItem<ExperienceRefData> = ({ item }) => (
    <FeaturedExperienceItem experience={item} />
  );
  const keyExtractor = (item: ExperienceRefData) => item._id;
  return (
    <FlatList
      ListHeaderComponent={FeaturedHeader}
      data={featuredExperiences}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default FeaturedExperiencesScreen;

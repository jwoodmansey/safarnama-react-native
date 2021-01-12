/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch } from "../../store/configure";
import { loadFeaturedExperiences } from "../../store/experience/experienceReducer";
import { selectFeaturedExperiences } from "../../store/experience/experienceSelectors";

import FeaturedExperienceItem from "./components/FeaturedExperienceItem";
import FeaturedHeader from "./FeaturedHeader";

const FeaturedExperiencesScreen: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const featuredExperiences = useSelector(selectFeaturedExperiences);
  useEffect(() => {
    dispatch(loadFeaturedExperiences());
  }, [dispatch]);
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <FlatList
      // contentContainerStyle={{ flex: 1 }}
      ListHeaderComponent={FeaturedHeader}
      data={featuredExperiences}
      keyExtractor={(data) => data._id}
      renderItem={({ item }) => <FeaturedExperienceItem experience={item} />}
    />
    // </SafeAreaView>
  );
};

export default FeaturedExperiencesScreen;

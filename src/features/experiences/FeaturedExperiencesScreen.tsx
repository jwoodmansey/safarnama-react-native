/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { loadFeaturedExperiences } from "../../store/experience/experienceReducer";
import { selectFeaturedExperiences } from "../../store/experience/experienceSelectors";
import FeaturedExperienceItem from "./components/FeaturedExperienceItem";
import FeaturedHeader from "./FeaturedHeader";

const FeaturedExperiencesScreen: React.FC = () => {
  const dispatch = useDispatch();
  const featuredExperiences = useSelector(selectFeaturedExperiences);
  useEffect(() => {
    dispatch(loadFeaturedExperiences());
  }, [dispatch]);
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View>
      <FlatList
        // contentContainerStyle={{ flex: 1 }}
        ListHeaderComponent={FeaturedHeader}
        data={featuredExperiences}
        keyExtractor={(data) => data._id}
        renderItem={({ item }) => <FeaturedExperienceItem experience={item} />}
      />
    </View>
    // </SafeAreaView>
  );
};

export default FeaturedExperiencesScreen;

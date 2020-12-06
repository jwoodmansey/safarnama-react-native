import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../store/configure";
import { loadFeaturedExperiences } from "../store/experience/experienceReducer";
import { selectFeaturedExperiences } from "../store/experience/experienceSelectors";
import FeaturedHeader from "./FeaturedHeader";

const FeaturedExperiencesScreen: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  const featuredExperiences = useSelector(selectFeaturedExperiences);
  useEffect(() => {
    dispatch(loadFeaturedExperiences());
  }, [dispatch]);
  return (
    <SafeAreaView>
      <Text>TEST {JSON.stringify(featuredExperiences)}</Text>
      <FlatList
        ListHeaderComponent={FeaturedHeader}
        data={featuredExperiences}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
      />
    </SafeAreaView>
  );
};

export default FeaturedExperiencesScreen;

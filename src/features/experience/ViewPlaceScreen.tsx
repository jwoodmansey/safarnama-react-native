import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { MapNaviationProp } from "../../types/nav/map";
import MediaItem from "./MediaItem";

type Route = RouteProp<MapNaviationProp, "ViewPlaceScreen">;

const ViewPlaceScreen: React.FC = () => {
  const { place } = useRoute<Route>().params;
  return (
    <FlatList
      contentContainerStyle={styles.panel}
      data={place.media}
      keyExtractor={(m) => m._id}
      renderItem={({ item }) => <MediaItem media={item} />}
    />
  );
};

const styles = StyleSheet.create({
  panel: {
    padding: 20,
  },
});

export default ViewPlaceScreen;

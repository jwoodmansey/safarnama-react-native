import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { MediaDocument } from "../../types/common/media";
import { MapNaviationProp } from "../../types/nav/map";
import MediaItem from "./MediaItem";

type Route = RouteProp<MapNaviationProp, "ViewPlaceScreen">;

const ViewPlaceScreen: React.FC = () => {
  const { place } = useRoute<Route>().params;
  const keyExtractor = (p: MediaDocument) => p._id;
  const renderItem: ListRenderItem<MediaDocument> = ({ item }) => (
    <MediaItem media={item} />
  );
  return (
    <FlatList
      contentContainerStyle={styles.panel}
      data={place.media}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  panel: {
    padding: 20,
  },
});

export default ViewPlaceScreen;

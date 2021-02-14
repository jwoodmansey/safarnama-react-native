import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MediaDocument } from "../../../types/common/media";
import { MapNaviationProp } from "../../../types/nav/map";
import MediaItem from "../components/MediaItem";

type Route = RouteProp<MapNaviationProp, "ViewPlaceScreen">;

const ViewPlaceScreen: React.FC = () => {
  const { place } = useRoute<Route>().params;
  const keyExtractor = (p: MediaDocument) => p._id;
  const ref = useRef<MapView>(null);
  const renderItem: ListRenderItem<MediaDocument> = ({ item }) => (
    <MediaItem media={item} />
  );
  const renderHeader = () => (
    <MapView
      ref={ref}
      liteMode
      scrollEnabled={false}
      zoomEnabled={false}
      style={styles.map}
      cacheEnabled
      rotateEnabled={false}
    >
      <Marker
        title={place.name}
        coordinate={{
          latitude: place.location.coordinates[1],
          longitude: place.location.coordinates[0],
        }}
      />
    </MapView>
  );
  useEffect(() => {
    ref.current?.setCamera({
      center: {
        latitude: place.location.coordinates[1],
        longitude: place.location.coordinates[0],
      },
      altitude: 2000,
      zoom: 16,
    });
  }, [place]);
  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.panel}
      data={place.media}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  panel: {
    // padding: 20,
  },
  map: {
    flex: 1,
    height: 150,
    marginBottom: 10,
  },
});

export default ViewPlaceScreen;

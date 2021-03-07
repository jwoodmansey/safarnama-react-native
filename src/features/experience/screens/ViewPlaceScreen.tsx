import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { MediaDocument } from "../../../types/common/media";
import { MapNaviationProp } from "../../../types/nav/map";
import MediaItem from "../components/MediaItem";
import PlaceIcon from "../components/PlaceIcon";

type Route = RouteProp<MapNaviationProp, "ViewPlaceScreen">;

const ViewPlaceScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  let { place } = params;
  const exp = useSelector(selectCurrentExperience);
  if (!place) {
    place = exp?.data.pointOfInterests?.find((p) => p._id === params.placeId);
  }
  const keyExtractor = (p: MediaDocument) => p._id;
  const ref = useRef<MapView>(null);
  const renderItem: ListRenderItem<MediaDocument> = ({ item }) => (
    <MediaItem media={item} />
  );

  const renderHeader = () =>
    place ? (
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
        >
          <PlaceIcon name={place.type.matIcon} />
        </Marker>
      </MapView>
    ) : null;
  useEffect(() => {
    if (place) {
      ref.current?.setCamera({
        center: {
          latitude: place.location.coordinates[1],
          longitude: place.location.coordinates[0],
        },
        altitude: 2000,
        zoom: 16,
      });
    }
  }, [place]);
  if (!place) {
    return null;
  }
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

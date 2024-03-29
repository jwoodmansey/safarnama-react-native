import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef } from "react";
import { FlatList, ListRenderItem, Platform, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { scrollIndicatorInsets } from "../../../style/dimensions";
import { MediaDocument } from "../../../types/common/media";
import { MapNaviationProp } from "../../../types/nav/map";
import EmptyPlaceScreen from "../components/EmptyPlaceScreen";
import MediaItem from "../components/MediaItem";
import PlaceFooter from "../components/PlaceFooter";
import PlaceMarker from "../components/PlaceMarker";

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

  const renderHeader = useCallback(
    () =>
      place ? (
        <MapView
          ref={ref}
          liteMode
          scrollEnabled={false}
          zoomEnabled={false}
          style={styles.map}
          cacheEnabled={Platform.OS === "ios"}
          rotateEnabled={false}
        >
          <PlaceMarker data={place} />
        </MapView>
      ) : null,
    [place]
  );
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
      ListEmptyComponent={<EmptyPlaceScreen />}
      ListFooterComponent={<PlaceFooter />}
      scrollIndicatorInsets={scrollIndicatorInsets}
    />
  );
};

const styles = StyleSheet.create({
  panel: {
    paddingBottom: 20,
  },
  map: {
    flex: 1,
    height: 150,
    marginBottom: 10,
  },
});

export default ViewPlaceScreen;

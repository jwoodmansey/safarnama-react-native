import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { FlatList, ListRenderItem, Platform, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { scrollIndicatorInsets } from "../../../style/dimensions";
import { MediaDocument } from "../../../types/common/media";
import EmptyPlaceScreen from "../components/EmptyPlaceScreen";
import MediaItem from "../components/MediaItem";
import PlaceFooter from "../components/PlaceFooter";
import PlaceMarker from "../components/PlaceMarker";
import { MapNavigationScreen } from "../../../types/nav/root";

const renderItem: ListRenderItem<MediaDocument> = ({ item }) => (
  <MediaItem media={item} />
);
const keyExtractor = (p: MediaDocument) => p._id;

const ViewPlaceScreen: MapNavigationScreen<"ViewPlaceScreen"> = ({ route }) => {
  const exp = useSelector(selectCurrentExperience);

  const place = useMemo(() => {
    const { params } = route;
    if (route.params.place) {
      return route.params.place;
    }
    return exp?.data.pointOfInterests?.find((p) => p._id === params.placeId);
  }, [exp?.data.pointOfInterests, route]);

  const ref = useRef<MapView>(null);

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

  const renderEmpty = useMemo(() => <EmptyPlaceScreen />, []);
  const renderFooter = useMemo(() => <PlaceFooter />, []);

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
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
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

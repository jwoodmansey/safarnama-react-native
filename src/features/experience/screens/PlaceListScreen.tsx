import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FuzzySearch from "fuzzy-search";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import BackgroundGeolocation from "react-native-background-geolocation";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { scrollIndicatorInsets } from "../../../style/dimensions";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import { MapNaviationProp } from "../../../types/nav/map";
import PlaceItem from "../components/PlaceItem";
import PlacesSearch from "../components/PlacesSearch";

type Nav = StackNavigationProp<MapNaviationProp, "ViewPlaceScreen">;

const keyExtractor = (place: PointOfInterestDocument) => place._id;

const PlaceListScreen: React.FC = () => {
  const nav = useNavigation<Nav>();

  const exp = useSelector(selectCurrentExperience);
  const places = exp?.data.pointOfInterests;
  const search = useMemo(() => {
    return new FuzzySearch(places || [], ["name"]);
  }, [places]);

  const [searchText, setSearchText] = useState("");
  const filteredPlaces = useMemo(() => {
    if (searchText.trim() === "" || places === undefined) {
      return places;
    }
    return search.search(searchText);
  }, [places, search, searchText]);

  const [currentLocation, setCurrentLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined);

  useEffect(() => {
    BackgroundGeolocation.watchPosition((location) => {
      setCurrentLocation(location.coords);
    });

    return () => {
      BackgroundGeolocation.stopWatchPosition();
    };
  }, []);

  const onPressCard = (place: PointOfInterestDocument) => {
    nav.navigate("ViewPlaceScreen", {
      name: place.name,
      placeId: place._id,
      place,
    });
  };

  const renderItem: ListRenderItem<PointOfInterestDocument> = ({ item }) => {
    return (
      <PlaceItem
        item={item}
        onPress={onPressCard}
        currentLocation={currentLocation}
      />
    );
  };

  const searchBar = useCallback(() => {
    return <PlacesSearch onChangeText={setSearchText} />;
  }, []);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      data={filteredPlaces}
      ListHeaderComponent={searchBar}
      scrollIndicatorInsets={scrollIndicatorInsets}
      renderItem={renderItem}
      extraData={searchText}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
});

export default PlaceListScreen;

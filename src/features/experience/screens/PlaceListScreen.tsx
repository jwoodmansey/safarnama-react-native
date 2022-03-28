import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Card, Paragraph, Subheading, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import BackgroundGeolocation from "react-native-background-geolocation";
import haversine from "haversine-distance";
import useGeoLocation from "../../../hooks/useGeoLocation";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import { MapNaviationProp } from "../../../types/nav/map";
import MediaThumb from "../components/MediaThumb";

type Route = RouteProp<MapNaviationProp, "ViewPlaceScreen">;

const PlaceListScreen: React.FC = () => {
  const nav = useNavigation();
  const route = useRoute<Route>();

  const exp = useSelector(selectCurrentExperience);
  const places = exp?.data.pointOfInterests;

  const [currentLocation, setCurrentLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined);

  useEffect(() => {
    BackgroundGeolocation.getCurrentPosition({ extras: {} }, (location) => {
      setCurrentLocation(location.coords);
      console.log(
        "heading",
        location.coords.heading,
        location.coords.heading_accuracy
      );
      console.log(location.coords.latitude, location.coords.longitude);
    });
    BackgroundGeolocation.onLocation((location) => {
      setCurrentLocation(location.coords);
      console.log("ON", location.coords.latitude, location.coords.longitude);
    });
  }, []);

  const renderItem: ListRenderItem<PointOfInterestDocument> = ({ item }) => (
    <Card style={styles.container}>
      {/* <Card.Cover source={{ uri: item.media[0]. }} /> */}
      <Card.Content>
        <Title>{item.name}</Title>
        {currentLocation && (
          <Paragraph>
            {(
              haversine(currentLocation, {
                longitude: item.location.coordinates[0],
                latitude: item.location.coordinates[1],
              }) / 1000
            ).toFixed(2)}
            km away
          </Paragraph>
        )}
        {/* <Paragraph>{item}</Paragraph> */}
      </Card.Content>
      {/* {Boolean(item.media[0]) && <MediaThumb media={item.media[0]} />} */}
      {/* <Subheading>{item.name}</Subheading> */}
    </Card>
  );

  return <FlatList data={places} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 10,
    // padding: 16,
  },
});

export default PlaceListScreen;

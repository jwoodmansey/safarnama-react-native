import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ExperienceMapView } from "./experience/ExperienceMapView";
import PlacesDetailsView from "./experience/PlaceDetailsView";

const MapScreen: React.FC = () => {
  return (
    <View style={styles.map}>

      <MapView
        showsUserLocation
        showsMyLocationButton
        showsScale
        style={styles.map}
        // initialRegion={{
        //   latitude: -2,
        //   longitude: 50.6,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        <ExperienceMapView></ExperienceMapView>
      </MapView>
      <PlacesDetailsView place={undefined}/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

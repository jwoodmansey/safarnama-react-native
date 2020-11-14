import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import ExperienceMapView from "./experience/ExperienceMapView";
import PlacesDetailsView from "./experience/PlaceDetailsView";

const MapScreen: React.FC = () => {
  return (
    <View style={styles.map}>
      <StatusBar barStyle="light-content" />
      <MapView
        // showsUserLocation
        showsMyLocationButton
        showsScale
        style={styles.map}
        initialRegion={{
          latitude: 28.7041,
          longitude: 77.1025,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <ExperienceMapView />
      </MapView>
      <PlacesDetailsView />
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

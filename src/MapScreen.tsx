import React, { useRef } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import ExperienceMapView from "./features/experience/ExperienceMapView";
import KeyModal from "./features/experience/KeyModal";

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  return (
    <View style={styles.map}>
      <StatusBar barStyle="light-content" />
      <MapView
        showsUserLocation
        showsCompass
        showsMyLocationButton
        showsScale
        style={styles.map}
        // onRegionChangeComplete={(reigon) => {}}
        // onRegionChange={(r) => {
        //   mapRef.current?.setMapBoundaries(28.7041, 77.1025);
        // }}
        initialRegion={{
          latitude: 28.7041,
          longitude: 77.1025,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
        <ExperienceMapView mapView={mapRef} />
      </MapView>
      <KeyModal />
      {/* <PlacesDetailsView /> */}
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

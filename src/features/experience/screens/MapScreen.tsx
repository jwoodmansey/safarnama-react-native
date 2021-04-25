import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import ExperienceMapView from "../components/ExperienceMapView";
import KeyModal from "../components/KeyModal";
import PermissionBanner from "../components/PermissionBanner";

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  return (
    <View style={styles.map}>
      <MapView
        showsUserLocation
        showsCompass
        showsMyLocationButton
        showsScale
        style={styles.map}
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
      <PermissionBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

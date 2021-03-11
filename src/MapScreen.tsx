import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import ExperienceMapView from "./features/experience/components/ExperienceMapView";
import KeyModal from "./features/experience/components/KeyModal";
import PermissionBanner from "./features/experience/components/PermissionBanner";

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
  container: {
    width: 100,
    height: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

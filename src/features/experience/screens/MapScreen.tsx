import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import { selectIsOnboardingComplete } from "../../../store/onboarding/onboardingSelectors";
import ExperienceMapView from "../components/ExperienceMapView";
import KeyModal from "../components/KeyModal";

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);
  return (
    <View style={styles.map}>
      <MapView
        showsUserLocation={isOnboardingComplete}
        showsCompass
        showsMyLocationButton={isOnboardingComplete}
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
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

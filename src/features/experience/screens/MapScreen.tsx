import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { selectIsOnboardingComplete } from "../../../store/onboarding/onboardingSelectors";
import OfflineBanner from "../../../ui/OfflineBanner";
import ActionMenu from "../components/ActionMenu";
import ExperienceMapView from "../components/ExperienceMapView";
import KeyModal from "../components/KeyModal";

const INITIAL_REGION = {
  latitude: 28.7041,
  longitude: 77.1025,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);

  const experience = useSelector(selectCurrentExperience);
  const [isRegionVisible, setIsRegionVisible] = useState(true);
  const [isCentred, setIsCentred] = useState(true);
  const centering = useRef(false);

  const onRegionChange = (region: Region) => {
    // bbox extent in minX, minY, maxX, maxY order
    if (
      experience?.bbox &&
      region.latitude > experience.bbox[1] &&
      region.latitude < experience.bbox[3] &&
      region.longitude > experience.bbox[0] &&
      region.longitude < experience.bbox[2]
    ) {
      if (!isRegionVisible) {
        setIsRegionVisible(true);
      }
    } else if (isRegionVisible) {
      setIsRegionVisible(false);
    }
    if (!centering.current) {
      setIsCentred(false);
    }
  };

  const centreMap = () => {
    if (experience) {
      const edgePadding = 20;
      mapRef.current?.fitToCoordinates(
        experience?.data.pointOfInterests?.map((p) => ({
          latitude: p.location.coordinates[1],
          longitude: p.location.coordinates[0],
        })),
        {
          edgePadding: {
            top: edgePadding,
            bottom: edgePadding,
            left: edgePadding,
            right: edgePadding,
          },
          animated: true,
        }
      );
      centering.current = true;
      setTimeout(() => {
        centering.current = false;
      }, 2000);
      setIsCentred(true);
    }
  };

  const [t] = useTranslation("manage");

  return (
    <View style={styles.map}>
      <MapView
        showsUserLocation={isOnboardingComplete}
        showsCompass
        showsMyLocationButton={isOnboardingComplete}
        showsScale
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={INITIAL_REGION}
        ref={mapRef}
      >
        <ExperienceMapView centreMap={centreMap} />
      </MapView>
      {!experience?.downloaded && (
        <OfflineBanner title={t("youAreOfflineAndNotDownloaded")} />
      )}
      <ActionMenu
        onPressCentre={centreMap}
        isRegionVisible={isRegionVisible}
        isCentred={isCentred}
      />
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

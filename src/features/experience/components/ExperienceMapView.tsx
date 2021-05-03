import { useNavigation } from "@react-navigation/native";
import React, { RefObject, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import { Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { selectIsOnboardingComplete } from "../../../store/onboarding/onboardingSelectors";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import { RouteDocument } from "../../../types/common/route";
import PlaceIcon from "./PlaceIcon";

type Props = {
  mapView: RefObject<MapView>;
};

const ExperienceMapView: React.FC<Props> = ({ mapView }) => {
  const experience = useSelector(selectCurrentExperience);
  const nav = useNavigation();
  const [t] = useTranslation(["route"]);
  const [currentlyZoomedTo, setCurrentlyZoomedTo] = useState<string>();
  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);

  useEffect(() => {
    if (experience) {
      nav.setOptions({ title: experience.data.name });
    } else if (!isOnboardingComplete) {
      nav.navigate("OnboardingScreen");
    } else {
      nav.navigate("AddExperience");
    }
    const id = experience?.data._id;
    if (experience && currentlyZoomedTo !== id) {
      const edgePadding = 20;
      mapView.current?.fitToCoordinates(
        experience.data.pointOfInterests?.map((p) => ({
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
      setCurrentlyZoomedTo(id);
    }
  }, [experience, nav, mapView, currentlyZoomedTo, isOnboardingComplete]);
  const onPressPlace = (place: PointOfInterestDocument) => () => {
    nav.navigate("ViewPlaceScreen", { place, name: place.name });
  };
  const onPressRoute = (route: RouteDocument) => () => {
    if (route.description) {
      Alert.alert(route.name, route.description);
    } else {
      Alert.alert(t("route:route"), route.name);
    }
  };
  return (
    <>
      {experience?.data.pointOfInterests?.map((p) => (
        <View key={p._id}>
          <Marker
            pinColor={Colors.red100}
            key={p._id}
            onPress={onPressPlace(p)}
            coordinate={{
              latitude: p.location.coordinates[1],
              longitude: p.location.coordinates[0],
            }}
          >
            <PlaceIcon name={p.type.matIcon} />
          </Marker>
          <Circle
            center={{
              latitude: p.triggerZone.lat,
              longitude: p.triggerZone.lng,
            }}
            radius={p.triggerZone.radius}
            strokeColor={Colors.red100}
          />
        </View>
      ))}
      {experience?.data.routes?.map((r) => (
        <View key={r._id}>
          <Polyline
            onPress={onPressRoute(r)}
            strokeColor={r.colour}
            strokeWidth={3}
            coordinates={r.geo.coordinates.map((c) => ({
              latitude: c[1],
              longitude: c[0],
            }))}
          />
          <Marker
            onPress={onPressRoute(r)}
            pinColor={r.colour}
            coordinate={{
              latitude: r.geo.coordinates[0][1],
              longitude: r.geo.coordinates[0][0],
            }}
          >
            <PlaceIcon color={r.colour} name="outlined_flag" />
          </Marker>
          <Marker
            onPress={onPressRoute(r)}
            pinColor={r.colour}
            coordinate={{
              latitude: r.geo.coordinates[r.geo.coordinates.length - 1][1],
              longitude: r.geo.coordinates[r.geo.coordinates.length - 1][0],
            }}
          >
            <PlaceIcon color={r.colour} name="flag" />
          </Marker>
        </View>
      ))}
    </>
  );
};

export default ExperienceMapView;

import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { RefObject, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { selectIsOnboardingComplete } from "../../../store/onboarding/onboardingSelectors";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import { RouteDocument } from "../../../types/common/route";
import PlaceMarker from "./PlaceMarker";
import Route from "./Route";

type Props = {
  mapView: RefObject<MapView>;
};

const ExperienceMapView: React.FC<Props> = ({ mapView }) => {
  const experience = useSelector(selectCurrentExperience);
  const nav = useNavigation();
  const [t] = useTranslation(["route"]);
  const [currentlyZoomedTo, setCurrentlyZoomedTo] = useState<string>();
  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (experience) {
        nav.setOptions({ title: experience.data.name });
      } else if (!isOnboardingComplete) {
        nav.navigate("OnboardingScreen");
      } else {
        nav.navigate("AddExperience");
      }
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
  }, [
    experience,
    nav,
    mapView,
    isFocused,
    currentlyZoomedTo,
    isOnboardingComplete,
  ]);
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
        <PlaceMarker data={p} onPress={onPressPlace(p)} key={p._id} />
      ))}
      {experience?.data.routes?.map((r) => (
        <Route key={r._id} data={r} onPress={onPressRoute(r)} />
      ))}
    </>
  );
};

export default ExperienceMapView;

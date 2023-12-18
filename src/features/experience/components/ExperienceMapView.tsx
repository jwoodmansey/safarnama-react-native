import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { selectIsOnboardingComplete } from "../../../store/onboarding/onboardingSelectors";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import { RouteDocument } from "../../../types/common/route";
import PlaceMarker from "./PlaceMarker";
import Route from "./Route";
import { RootStackScreenProps } from "../../../types/nav/root";

type Props = {
  centreMap: () => void;
};

const ExperienceMapView: React.FC<Props> = ({ centreMap }) => {
  const experience = useSelector(selectCurrentExperience);
  const nav = useNavigation<RootStackScreenProps<"Map">["navigation"]>();
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
        nav.navigate("AddExperience", { screen: "FeaturedExperienceScreen" });
      }
    }

    const id = experience?.data._id;
    if (experience && currentlyZoomedTo !== id) {
      centreMap();
      setCurrentlyZoomedTo(id);
    }
  }, [
    experience,
    nav,
    centreMap,
    isFocused,
    currentlyZoomedTo,
    isOnboardingComplete,
  ]);
  const onPressPlace = (place: PointOfInterestDocument) => () => {
    nav.navigate("Map", {
      screen: "ViewPlaceScreen",
      params: { place, name: place.name, placeId: place._id },
    });
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

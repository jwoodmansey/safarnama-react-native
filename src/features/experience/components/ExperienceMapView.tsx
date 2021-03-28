import { useNavigation } from "@react-navigation/native";
import React, { RefObject, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import PlaceIcon from "./PlaceIcon";

type Props = {
  mapView: RefObject<MapView>;
};

const ExperienceMapView: React.FC<Props> = ({ mapView }) => {
  const experience = useSelector(selectCurrentExperience);
  const nav = useNavigation();
  const [currentlyZoomedTo, setCurrentlyZoomedTo] = useState<string>();
  useEffect(() => {
    if (experience) {
      nav.setOptions({ title: experience.data.name });
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
  }, [experience, nav, mapView, currentlyZoomedTo]);
  const onPressPlace = (place: PointOfInterestDocument) => () => {
    nav.navigate("ViewPlaceScreen", { place, name: place.name });
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
    </>
  );
};

export default ExperienceMapView;

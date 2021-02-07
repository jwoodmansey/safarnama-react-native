/* eslint-disable no-underscore-dangle */
import React, { RefObject, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../store/configure";
import { ExperienceSnapshotData } from "../../types/common/experience";
import { PointOfInterestDocument } from "../../types/common/point-of-interest";
import { setSelectedPlace } from "../../store/experience/experienceReducer";
import PlaceIcon from "./PlaceIcon";
import { selectCurrentExperience } from "../../store/experience/experienceSelectors";

type Props = {
  mapView: RefObject<MapView>;
};

const ExperienceMapView: React.FC<Props> = ({ mapView }) => {
  const experience = useSelector<RootState, ExperienceSnapshotData | undefined>(
    selectCurrentExperience
  );
  const nav = useNavigation();
  const [currentlyZoomedTo, setCurrentlyZoomedTo] = useState<string>();
  useEffect(() => {
    if (experience) {
      nav.setOptions({ title: experience.data.name });
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

  const dispatch = useDispatch();
  const onPressPlace = (place: PointOfInterestDocument) => () => {
    dispatch(setSelectedPlace(place));
    nav.navigate("ViewPlaceScreen", { place });
  };
  return (
    <>
      {experience?.data.pointOfInterests?.map((p) => (
        <Marker
          title={p.name}
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
      ))}
    </>
  );
};

export default ExperienceMapView;

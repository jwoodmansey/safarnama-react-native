import React, { useEffect } from "react";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../store/configure";
import { ExperienceSnapshotData } from "../../types/common/experience";
import { PointOfInterestDocument } from "../../types/common/point-of-interest";
import { setSelectedPlace } from "../../store/experience/experienceReducer";
import PlaceIcon from "./PlaceIcon";
import { selectCurrentExperience } from "../../store/experience/experienceSelectors";

const ExperienceMapView: React.FC = () => {
  const experience = useSelector<RootState, ExperienceSnapshotData | undefined>(
    selectCurrentExperience
  );
  const nav = useNavigation();
  useEffect(() => {
    if (experience) {
      nav.setOptions({ title: experience.data.name });
    }
  }, [experience, nav]);

  const dispatch = useDispatch();
  const onPressPlace = (place: PointOfInterestDocument) => () => {
    dispatch(setSelectedPlace(place));
  };
  return (
    <>
      {experience?.data.pointOfInterests?.map((p) => (
        <Marker
          title={p.name}
          pinColor={Colors.red100}
          // eslint-disable-next-line no-underscore-dangle
          key={p._id}
          // description="Test"
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

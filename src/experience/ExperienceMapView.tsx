import React from "react";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "react-native-paper";
import { RootState } from "../store/configure";
import { ExperienceSnapshotData } from "../types/common/experience";
import { PointOfInterestDocument } from "../types/common/point-of-interest";
import { setSelectedPlace } from "../store/experience/experienceReducer";

const ExperienceMapView: React.FC = () => {
  const experience = useSelector<RootState, ExperienceSnapshotData>(
    (s) => s.experience.experiences[0]
  );
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
          description="Test"
          onPress={onPressPlace(p)}
          coordinate={{
            latitude: p.location.coordinates[1],
            longitude: p.location.coordinates[0],
          }}
        >
          <MaterialIcon size={20} name={p.type.matIcon.replace("_", "-")} />
        </Marker>
      ))}
    </>
  );
};

export default ExperienceMapView;

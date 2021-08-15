import React, { memo } from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Circle, Marker } from "react-native-maps";
import { Colors } from "react-native-paper";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import PlaceIcon from "./PlaceIcon";

type Props = {
  data: PointOfInterestDocument;
  onPress: () => void;
};

const PlaceMarker: React.FC<Props> = ({ data, onPress }) => {
  return (
    <>
      <Marker
        pinColor={Colors.red100}
        onPress={onPress}
        tracksViewChanges={false}
        coordinate={{
          latitude: data.location.coordinates[1],
          longitude: data.location.coordinates[0],
        }}
      >
        {data.type.imageIcon ? (
          <FastImage
            source={{ uri: data.type.imageIcon }}
            style={styles.imageIcon}
          />
        ) : (
          <PlaceIcon name={data.type.matIcon} />
        )}
      </Marker>
      <Circle
        center={{
          latitude: data.triggerZone.lat,
          longitude: data.triggerZone.lng,
        }}
        radius={data.triggerZone.radius}
        strokeColor="rgba(255, 99, 71, 0.1)"
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageIcon: {
    width: 24,
    height: 24,
  },
});

export default memo(PlaceMarker);

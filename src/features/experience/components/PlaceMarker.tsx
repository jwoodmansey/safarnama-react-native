import React, { memo } from "react";
import { Platform, View } from "react-native";
import { Circle, Marker } from "react-native-maps";
import { MD2Colors } from "react-native-paper";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import PlaceIcon from "./PlaceIcon";

type Props = {
  data: PointOfInterestDocument;
  onPress?: () => void;
};

const PlaceMarker: React.FC<Props> = ({ data, onPress }) => {
  return (
    <>
      <Marker
        pinColor={MD2Colors.red100}
        onPress={onPress}
        tracksViewChanges={false}
        coordinate={{
          latitude: data.location.coordinates[1],
          longitude: data.location.coordinates[0],
        }}
      >
        <PlaceIcon placeType={data.type} />
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

export default memo(PlaceMarker);

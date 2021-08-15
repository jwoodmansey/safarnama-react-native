import React, { memo } from "react";
import { Marker, Polyline } from "react-native-maps";
import { RouteDocument } from "../../../types/common/route";
import PlaceIcon from "./PlaceIcon";

type Props = {
  data: RouteDocument;
  onPress: () => void;
};

const Route: React.FC<Props> = ({ data, onPress }) => {
  return (
    <>
      <Polyline
        onPress={onPress}
        strokeColor={data.colour}
        strokeWidth={3}
        coordinates={data.geo.coordinates.map((c) => ({
          latitude: c[1],
          longitude: c[0],
        }))}
      />
      <Marker
        onPress={onPress}
        pinColor={data.colour}
        coordinate={{
          latitude: data.geo.coordinates[0][1],
          longitude: data.geo.coordinates[0][0],
        }}
      >
        <PlaceIcon
          color={data.colour}
          placeType={{ matIcon: "outlined_flag" }}
        />
      </Marker>
      <Marker
        onPress={onPress}
        pinColor={data.colour}
        coordinate={{
          latitude: data.geo.coordinates[data.geo.coordinates.length - 1][1],
          longitude: data.geo.coordinates[data.geo.coordinates.length - 1][0],
        }}
      >
        <PlaceIcon color={data.colour} placeType={{ matIcon: "flag" }} />
      </Marker>
    </>
  );
};

export default memo(Route);

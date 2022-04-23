import React, { memo } from "react";
import FastImage from "react-native-fast-image";
import { Colors } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { PlaceType } from "../../../types/common/point-of-interest";

type Props = {
  placeType: PlaceType;
  color?: string;
  size?: number;
};

const DEFAULT_COLOR = Colors.red500;
const DEFAULT_SIZE = 30;

const PlaceIcon: React.FC<Props> = ({
  placeType,
  color = DEFAULT_COLOR,
  size = DEFAULT_SIZE,
}) => {
  if (placeType.imageIconURL) {
    return (
      <FastImage
        source={{ uri: placeType.imageIconURL }}
        style={{ width: size, height: size }}
      />
    );
  }
  const parsedName = placeType.matIcon?.replace(/_/g, "-");
  if (parsedName) {
    if (MaterialIcon.hasIcon(parsedName)) {
      return <MaterialIcon color={color} size={size} name={parsedName} />;
    }
    if (MaterialCommunityIcon.hasIcon(parsedName)) {
      return (
        <MaterialCommunityIcon color={color} size={size} name={parsedName} />
      );
    }
  }
  return <MaterialIcon color={color} name="wrong-location" size={size} />;
};

export default memo(PlaceIcon);

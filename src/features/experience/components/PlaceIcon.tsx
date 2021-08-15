import React, { memo } from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { PlaceType } from "../../../types/common/point-of-interest";

type Props = {
  placeType: PlaceType;
  color?: string;
};

const size = 30;
const DEFAULT_COLOR = Colors.red500;

const PlaceIcon: React.FC<Props> = ({ placeType, color = DEFAULT_COLOR }) => {
  if (placeType.imageIcon) {
    return (
      <FastImage
        source={{ uri: placeType.imageIcon }}
        style={styles.imageIcon}
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
  return <MaterialIcon color={color} name="question" size={size} />;
};

const styles = StyleSheet.create({
  imageIcon: {
    width: size,
    height: size,
  },
});

export default memo(PlaceIcon);

import React, { memo } from "react";
import { Colors } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

type Props = {
  name: string;
};

const size = 30;
const color = Colors.red500;

const PlaceIcon: React.FC<Props> = ({ name }) => {
  const parsedName = name.replace(/_/g, "-");
  if (MaterialIcon.hasIcon(parsedName)) {
    return <MaterialIcon color={color} size={size} name={parsedName} />;
  }
  if (MaterialCommunityIcon.hasIcon(parsedName)) {
    return (
      <MaterialCommunityIcon color={color} size={size} name={parsedName} />
    );
  }
  return <MaterialIcon color={color} name="question" size={size} />;
};

export default memo(PlaceIcon);

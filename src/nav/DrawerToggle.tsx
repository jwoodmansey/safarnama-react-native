import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { IconButton } from "react-native-paper";

const DrawerToggle: React.FC = () => {
  const nav = useNavigation();
  const onPress = () => nav.dispatch(DrawerActions.toggleDrawer());
  return <IconButton onPress={onPress} icon="menu" />;
};

export default DrawerToggle;

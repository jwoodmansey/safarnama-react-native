import { useNavigation } from "@react-navigation/native";
import React from "react";
import { IconButton } from "react-native-paper";

const DrawerToggle: React.FC = () => {
  const nav = useNavigation();
  const onPress = () => (nav as any).toggleDrawer();
  return <IconButton onPress={onPress} icon="menu" />;
};

export default DrawerToggle;

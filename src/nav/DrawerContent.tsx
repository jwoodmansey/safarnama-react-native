import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { Drawer } from "react-native-paper";

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ ...props }) => {
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="Experiences">
        <Drawer.Item icon="map" onPress={() => {}} label="View" />
        <Drawer.Item icon="download" label="Switch" />
      </Drawer.Section>
      <Drawer.Section title="About">
        <Drawer.Item label="Third party licenses" />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

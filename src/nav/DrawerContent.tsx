import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { Drawer } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectExperiences } from "../store/experience/experienceSelectors";
import { navigate } from "./NavigationRef";

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ ...props }) => {
  const onPressViewCurrent = () => {
    navigate("MapScreen");
  };
  const onPressFeatured = () => {
    navigate("FeaturedScreen");
  };
  const experiences = useSelector(selectExperiences);
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="Experience">
        {experiences.map((e) => (
          <Drawer.Item key={e.id} icon="map" label={e.name} />
        ))}
        {/* <Drawer.Item
          icon="map"
          onPress={onPressViewCurrent}
          label="View current"
        /> */}
        <Drawer.Item
          icon="bookmark-multiple"
          onPress={onPressFeatured}
          label="Manage"
        />
        <Drawer.Item
          icon="download"
          onPress={onPressFeatured}
          label="Find more"
        />
      </Drawer.Section>
      <Drawer.Section title="About">
        <Drawer.Item icon="receipt" label="Third party licenses" />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

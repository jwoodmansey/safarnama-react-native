import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import SplashScreen from "react-native-splash-screen";
import AddExperienceNavigation from "./AddExperienceNavigation";
import DrawerContent from "./DrawerContent";
import ExperienceManagementNavigation from "./ExperienceManagementNavigation";
import MapNavigation from "./MapNavigation";

const Drawer = createDrawerNavigator();

const RootNavigation: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const scheme = useColorScheme();
  useEffect(() => {
    StatusBar.setBarStyle(
      scheme === "light" ? "dark-content" : "light-content"
    );
  }, [scheme]);
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="MapScreen" component={MapNavigation} />
      <Drawer.Screen
        name="ExperienceManagement"
        component={ExperienceManagementNavigation}
      />
      <Drawer.Screen name="AddExperience" component={AddExperienceNavigation} />
    </Drawer.Navigator>
  );
};

export default RootNavigation;

import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import SplashScreen from "react-native-splash-screen";
import LicensesNavigation from "../features/licenses/nav/LicensesNavigator";
import useDeeplinking from "../hooks/useDeeplinking";
import useGeoLocation from "../hooks/useGeoLocation";
import { RootStackNavigationProp } from "../types/nav/root";
import AddExperienceNavigation from "./AddExperienceNavigation";
import DrawerContent from "./DrawerContent";
import ExperienceManagementNavigation from "./ExperienceManagementNavigation";
import MapNavigation from "./MapNavigation";

const Drawer = createDrawerNavigator<RootStackNavigationProp>();

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
  useGeoLocation();
  useDeeplinking();
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="MapScreen" component={MapNavigation} />
      <Drawer.Screen
        name="ExperienceManagement"
        component={ExperienceManagementNavigation}
      />
      <Drawer.Screen name="AddExperience" component={AddExperienceNavigation} />
      <Drawer.Screen name="Licenses" component={LicensesNavigation} />
    </Drawer.Navigator>
  );
};

export default RootNavigation;

import { useNavigation, useTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LicensesNavigation from "../features/licenses/nav/LicensesNavigator";
import { RootStackNavigationProp } from "../types/nav/root";
import AddExperienceNavigation from "./AddExperienceNavigation";
import DrawerContent from "./DrawerContent";
import ExperienceManagementNavigation from "./ExperienceManagementNavigation";
import MapNavigation from "./MapNavigation";
import { selectIsOnboardingComplete } from "../store/onboarding/onboardingSelectors";

const Drawer = createDrawerNavigator<RootStackNavigationProp>();

const DrawerNavigation: React.FC = () => {
  const nav = useNavigation();
  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);
  useEffect(() => {
    if (!isOnboardingComplete) {
      nav.navigate("OnboardingScreen");
    }
  }, [isOnboardingComplete, nav]);
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

export default DrawerNavigation;

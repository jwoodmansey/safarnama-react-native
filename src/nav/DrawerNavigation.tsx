import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LicensesNavigation from "../features/licenses/nav/LicensesNavigator";
import { selectIsOnboardingComplete } from "../store/onboarding/onboardingSelectors";
import { RootStackNavigationProp } from "../types/nav/root";
import AddExperienceNavigation from "./AddExperienceNavigation";
import DrawerContent from "./DrawerContent";
import ExperienceManagementNavigation from "./ExperienceManagementNavigation";
import MapNavigation from "./MapNavigation";
import AboutNavigator from "../features/about/nav/AboutNavigator";
import PrivacyNavigator from "../features/privacy/nav/PrivacyNavigator";
import LanguageNavigator from "../features/privacy copy/nav/PrivacyNavigator";

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
      <Drawer.Screen name="About" component={AboutNavigator} />
      <Drawer.Screen name="Privacy" component={PrivacyNavigator} />
      <Drawer.Screen name="Language" component={LanguageNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

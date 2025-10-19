import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AboutNavigator from "../features/about/nav/AboutNavigator";
import LanguageNavigator from "../features/language/nav/LanguageNavigator";
import LicensesNavigation from "../features/licenses/nav/LicensesNavigator";
import PrivacyNavigator from "../features/privacy/nav/PrivacyNavigator";
import { selectIsOnboardingComplete } from "../store/onboarding/onboardingSelectors";
import { DrawerStackNavigationProp } from "../types/nav/root";
import AddExperienceNavigation from "./AddExperienceNavigation";
import DrawerContent from "./DrawerContent";
import ExperienceManagementNavigation from "./ExperienceManagementNavigation";
import { useRootStackNavigation } from "./hooks";
import MapNavigation from "./MapNavigation";

const Drawer = createDrawerNavigator<DrawerStackNavigationProp>();

const DrawerNavigation: React.FC = () => {
  const nav = useRootStackNavigation();
  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);
  useEffect(() => {
    if (!isOnboardingComplete) {
      nav.navigate("OnboardingScreen");
    }
  }, [isOnboardingComplete, nav]);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
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

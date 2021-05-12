import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Platform, StatusBar, useColorScheme } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";
import OnboardingScreen from "../features/onboarding/screens/OnBoardingScreen";
import useDeeplinking from "../hooks/useDeeplinking";
import useGeoLocation from "../hooks/useGeoLocation";
import { updateExperiences } from "../store/experience/experienceReducer";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createStackNavigator();

const RootNavigation: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const scheme = useColorScheme();
  const theme = useTheme();
  useEffect(() => {
    StatusBar.setBarStyle(
      scheme === "light" ? "dark-content" : "light-content"
    );
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(theme.colors.background);
    }
  }, [scheme, theme]);
  useGeoLocation();
  useDeeplinking();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateExperiences());
  }, [dispatch]);
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Drawer"
        options={{ headerShown: false }}
        component={DrawerNavigation}
      />
      <Stack.Screen
        name="OnboardingScreen"
        options={{ headerShown: false }}
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

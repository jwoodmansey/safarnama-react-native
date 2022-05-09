import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import ExperienceDetailsScreen from "../features/experience/screens/ExperienceDetailsScreen";
import FeaturedExperiencesScreen from "../features/experiences/screens/FeaturedExperiencesScreen";
import ScanQRCodeScreen from "../features/qr-code/screens/ScanQRCodeScreen";
import { AddExperienceProp } from "../types/nav/addExperience";
import DrawerToggle from "./DrawerToggle";

const Stack = createStackNavigator<AddExperienceProp>();

const AddExperienceNavigation: React.FC = () => {
  const [t] = useTranslation(["manage"]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeaturedExperienceScreen"
        options={{
          headerLeft: () => <DrawerToggle />,
          title: t("manage:featuredExperiences"),
        }}
        component={FeaturedExperiencesScreen}
      />
      <Stack.Screen
        name="ScanQRCodeScreen"
        options={{
          title: t("manage:scanQrCode"),
        }}
        component={ScanQRCodeScreen}
      />
      <Stack.Screen
        name="ExperienceDetailsScreen"
        component={ExperienceDetailsScreen}
        options={({ route }) => ({
          title: route.params.experience?.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default AddExperienceNavigation;

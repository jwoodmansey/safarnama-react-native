import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ExperienceDetailsScreen from "../features/experiences/ExperienceDetailsScreen";
import FeaturedExperiencesScreen from "../features/experiences/FeaturedExperiencesScreen";
import ScanQRCodeScreen from "../features/qr-code/screens/ScanQRCodeScreen";
import { AddExperienceProp } from "../types/nav/addExperience";
import DrawerToggle from "./DrawerToggle";

const Stack = createStackNavigator<AddExperienceProp>();

const AddExperienceNavigation: React.FC = () => {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="FeaturedExperienceScreen"
        options={{
          headerLeft: () => <DrawerToggle />,
          title: "Featured experiences",
        }}
        component={FeaturedExperiencesScreen}
      />
      <Stack.Screen
        name="ScanQRCodeScreen"
        options={{ title: "Scan QR code" }}
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

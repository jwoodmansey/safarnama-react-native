import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ExperienceDetailsScreen from "../experiences/ExperienceDetailsScreen";
import FeaturedExperiencesScreen from "../experiences/FeaturedExperiencesScreen";
import { ExperienceManagementProp } from "../types/nav/experienceManagement";
import DrawerToggle from "./DrawerToggle";

const Stack = createStackNavigator<ExperienceManagementProp>();

const ExperienceManagementNavigation: React.FC = () => {
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
        name="ExperienceDetailsScreen"
        component={ExperienceDetailsScreen}
        options={({ route }) => ({
          title: route.params.experience.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default ExperienceManagementNavigation;

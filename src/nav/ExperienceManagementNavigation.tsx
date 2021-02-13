import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ExperienceDetailsScreen from "../features/experience/screens/ExperienceDetailsScreen";
import ManageExperiencesScreen from "../features/experiences/screens/ManageExperiencesScreen";
import { ExperienceManagementProp } from "../types/nav/experienceManagement";
import DrawerToggle from "./DrawerToggle";

const Stack = createStackNavigator<ExperienceManagementProp>();

const ExperienceManagementNavigation: React.FC = () => {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="ManageExperiencesScreen"
        component={ManageExperiencesScreen}
        options={{
          title: "Manage experiences",
          headerLeft: () => <DrawerToggle />,
        }}
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

export default ExperienceManagementNavigation;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../MapScreen";
import DrawerToggle from "./DrawerToggle";

const Stack = createStackNavigator();

const MapNavigation: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Experience"
      component={MapScreen}
      options={{ headerLeft: () => <DrawerToggle /> }}
    />
  </Stack.Navigator>
);

export default MapNavigation;

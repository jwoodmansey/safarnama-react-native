import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../MapScreen";
import DrawerToggle from "./DrawerToggle";
import PDFScreen from "../media/PDFScreen";

const Stack = createStackNavigator();

const MapNavigation: React.FC = () => (
  <Stack.Navigator mode="card">
    <Stack.Screen
      name="Experience"
      component={MapScreen}
      options={{ headerLeft: () => <DrawerToggle /> }}
    />
    <Stack.Screen
      name="PDFScreen"
      component={PDFScreen}
      options={({ route }) => ({ title: route?.params?.media.description })}
      // options={{ headerLeft: () => <DrawerToggle /> }}
    />
  </Stack.Navigator>
);

export default MapNavigation;

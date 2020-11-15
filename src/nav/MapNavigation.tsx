import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../MapScreen";
import DrawerToggle from "./DrawerToggle";
import PDFScreen from "../media/PDFScreen";
import { MapNaviationProp } from "../types/nav/map";
import ImageScreen from "../media/ImageScreen";

const Stack = createStackNavigator<MapNaviationProp>();

const MapNavigation: React.FC = () => (
  <Stack.Navigator mode="card">
    <Stack.Screen
      name="MapScreen"
      component={MapScreen}
      options={{ headerLeft: () => <DrawerToggle /> }}
    />
    <Stack.Screen
      name="PDFScreen"
      component={PDFScreen}
      options={({ route }) => ({
        title: route?.params?.media.name
          ? route?.params?.media.name
          : route?.params?.media.description,
      })}
      // options={{ headerLeft: () => <DrawerToggle /> }}
    />
    <Stack.Screen
      name="ImageScreen"
      component={ImageScreen}
      options={({ route }) => ({
        title: route?.params?.media.name
          ? route?.params?.media.name
          : route?.params?.media.description,
      })}
      // options={{ headerLeft: () => <DrawerToggle /> }}
    />
  </Stack.Navigator>
);

export default MapNavigation;

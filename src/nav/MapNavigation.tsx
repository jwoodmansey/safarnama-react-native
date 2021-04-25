import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ViewPlaceScreen from "../features/experience/screens/ViewPlaceScreen";
import MapScreen from "../features/experience/screens/MapScreen";
import ImageScreen from "../media/ImageScreen";
import PDFScreen from "../media/PDFScreen";
import { MapNaviationProp } from "../types/nav/map";
import DrawerToggle from "./DrawerToggle";
import KeyToggle from "./KeyToggle";

const Stack = createStackNavigator<MapNaviationProp>();

const MapNavigation: React.FC = () => {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerLeft: () => <DrawerToggle />,
          headerRight: () => <KeyToggle />,
        }}
      />
      <Stack.Screen
        name="PDFScreen"
        component={PDFScreen}
        options={({ route }) => ({
          title: route?.params?.media.name
            ? route?.params?.media.name
            : route?.params?.media.description,
        })}
      />
      <Stack.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={({ route }) => ({
          title: route?.params?.media.name
            ? route?.params?.media.name
            : route?.params?.media.description,
        })}
      />
      <Stack.Screen
        name="ViewPlaceScreen"
        component={ViewPlaceScreen}
        options={({ route }) => ({
          title: route?.params.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default MapNavigation;

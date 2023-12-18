import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import ViewPlaceScreen from "../features/experience/screens/ViewPlaceScreen";
import MapScreen from "../features/experience/screens/MapScreen";
import ImageScreen from "../media/ImageScreen";
import PDFScreen from "../media/PDFScreen";
import DrawerToggle from "./DrawerToggle";
import PlaceListScreen from "../features/experience/screens/PlaceListScreen";
import { MapNaviationProp } from "../types/nav/root";

const Stack = createStackNavigator<MapNaviationProp>();

const MapNavigation: React.FC = () => {
  const [t] = useTranslation(["place", "glossary"]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: t("glossary:appName"),
          headerLeft: () => <DrawerToggle />,
        }}
      />
      <Stack.Screen
        name="PDFScreen"
        component={PDFScreen}
        options={({ route }) => ({
          title: route?.params?.media.name
            ? route?.params?.media.name
            : route?.params?.media.description || "",
        })}
      />
      <Stack.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={({ route }) => ({
          title: route?.params?.media.name
            ? route?.params?.media.name
            : route?.params?.media.description || "",
        })}
      />
      <Stack.Screen
        name="ViewPlaceScreen"
        component={ViewPlaceScreen}
        options={({ route }) => ({
          title: route?.params.name,
        })}
      />
      <Stack.Screen
        name="PlaceListScreen"
        component={PlaceListScreen}
        options={{
          title: t("place:places"),
        }}
      />
    </Stack.Navigator>
  );
};

export default MapNavigation;

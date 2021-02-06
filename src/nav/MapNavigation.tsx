import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Alert } from "react-native";
import { IconButton } from "react-native-paper";
import ViewPlaceScreen from "../features/experience/ViewPlaceScreen";
import MapScreen from "../MapScreen";
import ImageScreen from "../media/ImageScreen";
import PDFScreen from "../media/PDFScreen";
import { MapNaviationProp } from "../types/nav/map";
import DrawerToggle from "./DrawerToggle";

const Stack = createStackNavigator<MapNaviationProp>();

const MapNavigation: React.FC = () => {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerLeft: () => <DrawerToggle />,
          headerRight: () => (
            <IconButton
              onPress={() => {
                Alert.alert("key");
              }}
              icon="key"
            />
          ),
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
          title: route?.params?.place.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default MapNavigation;

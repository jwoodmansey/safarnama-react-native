import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import DrawerToggle from "../../../nav/DrawerToggle";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const SettingsNavigator: React.FC = () => {
  const [t] = useTranslation(["settings"]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: t("settings:customise.customise"),
          headerLeft: () => <DrawerToggle />,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;

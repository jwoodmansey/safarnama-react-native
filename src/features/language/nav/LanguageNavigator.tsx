import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import DrawerToggle from "../../../nav/DrawerToggle";
import PrivacyScreen from "../LanguageScreen";

const Stack = createStackNavigator();

const LanguageNavigator: React.FC = () => {
  const [t] = useTranslation(["settings"]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LanguageScreen"
        component={PrivacyScreen}
        options={{
          title: t("settings:language.language"),
          headerLeft: () => <DrawerToggle />,
        }}
      />
    </Stack.Navigator>
  );
};

export default LanguageNavigator;

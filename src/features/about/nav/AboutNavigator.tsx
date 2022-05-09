import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import DrawerToggle from "../../../nav/DrawerToggle";
import LicensesScreen from "../AboutScreen";

const Stack = createStackNavigator();

const AboutNavigator: React.FC = () => {
  const [t] = useTranslation(["glossary"]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LicensesScreen"
        component={LicensesScreen}
        options={{
          title: t("glossary:about"),
          headerLeft: () => <DrawerToggle />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AboutNavigator;

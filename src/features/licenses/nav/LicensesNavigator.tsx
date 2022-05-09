import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import DrawerToggle from "../../../nav/DrawerToggle";
import LicensesScreen from "../LicensesScreen";

const Stack = createStackNavigator();

const LicensesNavigation: React.FC = () => {
  const [t] = useTranslation(["about"]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LicensesScreen"
        component={LicensesScreen}
        options={{
          title: t("about:thirdPartyLicenses"),
          headerLeft: () => <DrawerToggle />,
        }}
      />
    </Stack.Navigator>
  );
};

export default LicensesNavigation;

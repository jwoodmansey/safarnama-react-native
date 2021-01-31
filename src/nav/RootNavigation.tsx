import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
// import { loadExperience } from "../store/experience/experienceReducer";
import DrawerContent from "./DrawerContent";
import ExperienceManagementNavigation from "./ExperienceManagementNavigation";
import MapNavigation from "./MapNavigation";

const Drawer = createDrawerNavigator();

const RootNavigation: React.FC = () => {
  // const dispatch = useDispatch<RootDispatch>();
  // useEffect(() => {
  //   dispatch(loadExperiences());
  // }, [dispatch]);
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Drawer.Navigator
      screenOptions={{}}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="MapScreen" component={MapNavigation} />
      <Drawer.Screen
        name="FeaturedScreen"
        options={{ title: "Featured" }}
        component={ExperienceManagementNavigation}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigation;

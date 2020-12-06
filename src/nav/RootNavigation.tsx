import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FeaturedExperiencesScreen from "../experiences/FeaturedExperiencesScreen";
import { RootDispatch } from "../store/configure";
import { loadExperiences } from "../store/experience/experienceReducer";
import DrawerContent from "./DrawerContent";
import MapNavigation from "./MapNavigation";

const Drawer = createDrawerNavigator();

const RootNavigation: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  useEffect(() => {
    dispatch(loadExperiences());
  }, [dispatch]);
  return (
    <Drawer.Navigator
      screenOptions={{}}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="MapScreen" component={MapNavigation} />
      <Drawer.Screen
        name="FeaturedScreen"
        component={FeaturedExperiencesScreen}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigation;

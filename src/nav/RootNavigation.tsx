import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import MapScreen from "../MapScreen";
import MapNavigation from "./MapNavigation";
import DrawerContent from "./DrawerContent";
import { RootDispatch } from "../store/configure";
import { loadExperiences } from "../store/experience/experienceReducer";

const Drawer = createDrawerNavigator();

const RootNavigation: React.FC = () => {
  const dispatch = useDispatch<RootDispatch>();
  useEffect(() => {
    dispatch(loadExperiences());
  }, [dispatch]);
  return (
    <Drawer.Navigator screenOptions={{}} drawerContent={DrawerContent}>
      <Drawer.Screen name="Feed" component={MapNavigation} />
      <Drawer.Screen name="Article" component={MapScreen} />
    </Drawer.Navigator>
  );
};

export default RootNavigation;

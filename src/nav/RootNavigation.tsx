import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from '../MapScreen';
import MapNavigation from './MapNavigation';

const Drawer = createDrawerNavigator();

const RootNavigation: React.FC = () => {
  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen name="Feed" component={MapNavigation} />
      <Drawer.Screen name="Article" component={MapScreen} />
    </Drawer.Navigator>
  );
}

export default RootNavigation
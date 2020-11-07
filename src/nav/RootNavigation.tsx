import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from '../MapScreen';

const Drawer = createDrawerNavigator();

const RootNavigation: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={MapScreen} />
      <Drawer.Screen name="Article" component={MapScreen} />
    </Drawer.Navigator>
  );
}

export default RootNavigation
import React from 'react'
import MapScreen from '../MapScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import DrawerToggle from './DrawerToggle'

const Stack = createStackNavigator();

const MapNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Experience" component={MapScreen} options={{headerLeft: () => <DrawerToggle/>}} />
    </Stack.Navigator>
  );
}

export default MapNavigation
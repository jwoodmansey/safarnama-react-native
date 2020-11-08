import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { IconButton } from 'react-native-paper';

const DrawerToggle: React.FC = () => {
  const nav = useNavigation()
  const onPress = () => (nav as any).toggleDrawer()
  return (
    <TouchableOpacity onPress={onPress}>
      <IconButton icon="menu"/>
    </TouchableOpacity>
  )
}

export default DrawerToggle
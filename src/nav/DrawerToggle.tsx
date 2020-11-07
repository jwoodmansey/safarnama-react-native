import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const DrawerToggle: React.FC = () => {
  const nav = useNavigation()
  const onPress = () => (nav as any).toggleDrawer()
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>IconHere</Text>
    </TouchableOpacity>
  )
}

export default DrawerToggle
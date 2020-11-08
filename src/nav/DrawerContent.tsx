import React from 'react'

import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';

const DrawerContent: React.FC<DrawerContentComponentProps> = ({...props}) => {
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="Experiences">
        <Drawer.Item icon="map" onPress={() => {}} label="View">

        </Drawer.Item>
        <Drawer.Item icon="download" label="Switch">

        </Drawer.Item>
      </Drawer.Section>
      <Drawer.Section title="About">
        <Drawer.Item label="Third party licenses">
        </Drawer.Item>
      </Drawer.Section>
    </DrawerContentScrollView>
  )
}

export default DrawerContent
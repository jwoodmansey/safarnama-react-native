import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const PlaceDetailsViewContent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Test!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    height: '100%',
  }
})

export default PlaceDetailsViewContent
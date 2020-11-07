import React from 'react'
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';


const MapScreen: React.FC = () => {
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default MapScreen
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { PointOfInterestDocument } from '../types/common/point-of-interest'
import MediaItem from './MediaItem'

type Props = {
  place?: PointOfInterestDocument
}

const PlaceDetailsViewContent: React.FC<Props> = ({place}) => {
  if (!place) return null

  return (
    <View style={styles.panel}>
      <Title style={styles.panelTitle}>{place.name}</Title>
      {/* <Text style={styles.panelSubtitle}>
        International Airport - 40 miles away
      </Text> */}
      {place.media.map(m => <MediaItem media={m}></MediaItem>)}
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Directions</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Search Nearby</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  panel: {
    // height: '100%',
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  panelTitle: {
    fontSize: 27,
    // height: 35,
    color: 'black',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default PlaceDetailsViewContent
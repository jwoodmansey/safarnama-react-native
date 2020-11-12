import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Caption, Colors, Headline, Paragraph, Subheading, Surface, Text, Title } from 'react-native-paper'
import { MediaDocument } from '../types/common/media'

type Props = {
  media: MediaDocument
}

const isEmpty = (str?: string): boolean => str === undefined || str.trim().length == 0

const MediaItem: React.FC<Props> = ({ media }) => {

  let item = null
  switch (media.mimetype) {
    case 'image/jpeg': {
      item = <Image style={{ maxHeight: 500, minHeight: 300, width: '100%' }} source={{ uri: media.path }}></Image>
    }
  }

  return (
    <Surface style={styles.container}>
      {item}
      <View style={styles.textContainer}>
        {!isEmpty(media.name) && <Subheading style={styles.name}>{media.name}</Subheading>}
        {!isEmpty(media.description) && <Title style={styles.description}>{media.description}</Title>}
        {!isEmpty(media.acknowledgements) && <Caption style={styles.acknowledgements}>{media.acknowledgements}</Caption>}
      </View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: { borderRadius: 4, backgroundColor: Colors.white, marginBottom: 32 },
  textContainer: {
    padding: 16,
  },
  name: {
    color: Colors.black,
  },
  description: {
    color: Colors.black,
  },
  acknowledgements: {
    fontStyle: 'italic',
    color: Colors.grey600
  }
})

export default MediaItem;
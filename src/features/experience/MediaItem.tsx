import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Caption,
  Colors,
  Subheading,
  Surface,
  Title,
} from "react-native-paper";
import { MediaDocument } from "../../types/common/media";
import MediaThumb from "./MediaThumb";

type Props = {
  media: MediaDocument;
};

const isEmpty = (str?: string): boolean =>
  str === undefined || str.trim().length === 0;

const MediaItem: React.FC<Props> = ({ media }) => {
  return (
    <Surface style={styles.container}>
      <MediaThumb media={media} />
      {(!isEmpty(media.name) ||
        !isEmpty(media.description) ||
        !isEmpty(media.acknowledgements)) && (
        <View style={styles.textContainer}>
          <Text>LOCAL {media.localPath}</Text>
          {!isEmpty(media.name) && (
            <Subheading style={styles.name}>{media.name}</Subheading>
          )}
          {!isEmpty(media.description) && (
            <Title style={styles.description}>{media.description}</Title>
          )}
          {!isEmpty(media.acknowledgements) && (
            <Caption style={styles.acknowledgements}>
              {media.acknowledgements}
            </Caption>
          )}
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginBottom: 32,
  },
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
    fontStyle: "italic",
    color: Colors.grey600,
  },
});

export default MediaItem;

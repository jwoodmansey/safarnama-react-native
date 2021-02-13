import React from "react";
import { StyleSheet, View } from "react-native";
import { Caption, Card, Subheading, Title } from "react-native-paper";
import { MediaDocument } from "../../types/common/media";
import MediaThumb from "./MediaThumb";

type Props = {
  media: MediaDocument;
};

const isEmpty = (str?: string): boolean =>
  str === undefined || str.trim().length === 0;

const MediaItem: React.FC<Props> = ({ media }) => {
  return (
    <Card style={styles.container}>
      <MediaThumb media={media} />
      {(!isEmpty(media.name) ||
        !isEmpty(media.description) ||
        !isEmpty(media.acknowledgements)) && (
        <View style={styles.textContainer}>
          {/* <Text>LOCAL media.localPath}</Text> */}
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
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textContainer: {
    padding: 16,
  },
  name: {
    // color: Colors.black,
  },
  description: {
    // color: Colors.black,
  },
  acknowledgements: {
    fontStyle: "italic",
    // color: Colors.grey600,
  },
});

export default MediaItem;

import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, View } from "react-native";
import {
  Caption,
  Card,
  Divider,
  List,
  Subheading,
  Title,
} from "react-native-paper";
import { MediaDocument } from "../../../types/common/media";
import MediaThumb from "./MediaThumb";

type Props = {
  media: MediaDocument;
};

const isEmpty = (str?: string | any[]): boolean =>
  str === undefined ||
  (Array.isArray(str) && str.length === 0) ||
  (typeof str === "string" && str.trim().length === 0);

const MediaItem: React.FC<Props> = ({ media }) => {
  const [t] = useTranslation(["media"]);
  return (
    <Card style={styles.container}>
      <MediaThumb media={media} />
      {(!isEmpty(media.name) ||
        !isEmpty(media.description) ||
        !isEmpty(media.acknowledgements) ||
        !isEmpty(media.externalLinks)) && (
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
          {!isEmpty(media.externalLinks) && (
            <>
              {media.externalLinks.map((l) => {
                const onPress = () => Linking.openURL(l.url);
                const left = () => (
                  <List.Icon color="#000" icon="open-in-new" />
                );
                return (
                  <List.Section>
                    <Divider style={styles.externalLinkDivider} />
                    <Subheading>{t("media:links")}</Subheading>
                    <List.Item
                      onPress={onPress}
                      style={styles.externalLinkListItem}
                      title={l.name}
                      left={left}
                    />
                  </List.Section>
                );
              })}
              <Caption style={styles.acknowledgements}>
                {t("media:notResponsibleForLinks")}
              </Caption>
            </>
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
  },
  externalLinkDivider: {
    marginVertical: 12,
  },
  externalLinkListItem: {
    margin: 0,
    padding: 0,
  },
});

export default MediaItem;

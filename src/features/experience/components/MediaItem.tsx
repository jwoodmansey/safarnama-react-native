import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
  Caption,
  Card,
  Divider,
  List,
  Subheading,
  Title,
} from "react-native-paper";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { MediaDocument } from "../../../types/common/media";
import { openInAppBrowser } from "../../../utils/linking";
import MediaThumb from "./MediaThumb";
import { handleDeeplink } from "../../../hooks/useDeeplinking";
import { BASE_URL } from "../../../config";

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
              <Divider style={styles.externalLinkDivider} />
              <Subheading>{t("media:links")}</Subheading>
              {media.externalLinks.map((l) => {
                const onPress = async () => {
                  try {
                    console.log(media.externalLinks);
                    // First check if this was a dynamic link (likely a link to an experience)
                    const resolved = await dynamicLinks().resolveLink(l.url);
                    const handledDynamicLink = handleDeeplink(resolved.url);
                    if (handledDynamicLink) return;
                  } catch (e) {
                    if (l.url.startsWith(BASE_URL)) {
                      const handledLink = handleDeeplink(l.url);
                      if (handledLink) return;
                    }
                  }
                  openInAppBrowser(l.url);
                };
                const left = () => <List.Icon icon="open-in-new" />;
                return (
                  <List.Section key={l.name}>
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

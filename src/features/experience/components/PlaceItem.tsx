import React from "react";

import haversine from "haversine-distance";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Card, Paragraph, Title } from "react-native-paper";
import Pdf from "react-native-pdf";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import { getPath } from "../../../store/mediaService";
import { getMediaType, MediaType } from "../../../types/media";
import PlaceIcon from "./PlaceIcon";
import { locale } from "../../../i18n/config";

const formatter = Intl.NumberFormat(locale, {
  maximumFractionDigits: 2,
});

type Props = {
  item: PointOfInterestDocument;
  currentLocation: { latitude: number; longitude: number } | undefined;
  onPress: (item: PointOfInterestDocument) => void;
};

const PlaceItem: React.FC<Props> = ({ item, currentLocation, onPress }) => {
  const [t] = useTranslation(["distance", "media"]);
  const { colors } = useTheme();

  const renderThumb = () => {
    const imageThumb = item.media.find(
      (m) => getMediaType(m.mimetype) === MediaType.Image
    );
    if (imageThumb) {
      return (
        <FastImage
          style={styles.placeCardImage}
          resizeMode="cover"
          source={{
            uri: getPath(imageThumb),
          }}
        />
      );
    }
    const pdfThumb = item.media.find(
      (m) => getMediaType(m.mimetype) === MediaType.Pdf
    );
    if (pdfThumb) {
      return (
        <Pdf
          trustAllCerts={false}
          singlePage
          fitPolicy={1}
          style={[styles.placeCardImage, { backgroundColor: colors.card }]}
          source={{ uri: getPath(pdfThumb), cache: true }}
        />
      );
    }
    return (
      <View style={styles.placeCardImage}>
        <PlaceIcon size={60} placeType={item.type} />
      </View>
    );
  };

  const press = () => {
    onPress(item);
  };

  return (
    <Card style={styles.container} onPress={press}>
      <View style={styles.placeCard}>
        {renderThumb()}
        <Card.Content style={styles.placeCardText}>
          <Title>{item.name}</Title>
          <Paragraph>
            {t("media:mediaCount", { count: item.media.length })}
            {currentLocation &&
              // eslint-disable-next-line i18next/no-literal-string
              `\n${t("distance:kmAway", {
                distance: formatter.format(
                  haversine(currentLocation, {
                    longitude: item.location.coordinates[0],
                    latitude: item.location.coordinates[1],
                  }) / 1000
                ),
              })}`}
          </Paragraph>
        </Card.Content>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  placeCard: {
    flexDirection: "row",
  },
  placeCardImage: {
    minHeight: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  placeCardText: {
    flexShrink: 1,
    paddingVertical: 10,
  },
});

export default PlaceItem;

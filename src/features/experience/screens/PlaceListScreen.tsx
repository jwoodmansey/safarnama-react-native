import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import BackgroundGeolocation from "react-native-background-geolocation";
import haversine from "haversine-distance";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
import Pdf from "react-native-pdf";
import { selectCurrentExperience } from "../../../store/experience/experienceSelectors";
import { PointOfInterestDocument } from "../../../types/common/point-of-interest";
import { MapNaviationProp } from "../../../types/nav/map";
import { getPath } from "../../../store/mediaService";
import { getMediaType, MediaType } from "../../../types/media";
import PlaceIcon from "../components/PlaceIcon";
import { scrollIndicatorInsets } from "../../../style/dimensions";
import { locale } from "../../../i18n/config";

type Nav = StackNavigationProp<MapNaviationProp, "ViewPlaceScreen">;

const formatter = Intl.NumberFormat(locale, {
  maximumFractionDigits: 2,
});

const PlaceListScreen: React.FC = () => {
  const nav = useNavigation<Nav>();

  const exp = useSelector(selectCurrentExperience);
  const places = exp?.data.pointOfInterests;

  const [currentLocation, setCurrentLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined);

  useEffect(() => {
    BackgroundGeolocation.watchPosition((location) => {
      setCurrentLocation(location.coords);
    });

    return () => {
      BackgroundGeolocation.stopWatchPosition();
    };
  }, []);

  const onPressCard = (place: PointOfInterestDocument) => () => {
    nav.navigate("ViewPlaceScreen", {
      name: place.name,
      placeId: place._id,
      place,
    });
  };

  const [t] = useTranslation(["distance", "media"]);
  const { colors } = useTheme();

  const renderItem: ListRenderItem<PointOfInterestDocument> = ({ item }) => {
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

    return (
      <Card style={styles.container} onPress={onPressCard(item)}>
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

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={places}
      scrollIndicatorInsets={scrollIndicatorInsets}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },

  list: {
    paddingVertical: 10,
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

export default PlaceListScreen;

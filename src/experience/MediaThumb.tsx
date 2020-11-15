import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Caption, Colors } from "react-native-paper";
import Pdf from "react-native-pdf";
import HTML from "react-native-render-html";
import { MediaDocument } from "../types/common/media";
import { getMediaType, MediaType } from "../types/media";
import { MapNaviationProp } from "../types/nav/map";

type Props = {
  media: MediaDocument;
};

const MediaThumb: React.FC<Props> = ({ media }) => {
  const nav = useNavigation<StackNavigationProp<MapNaviationProp>>();
  switch (getMediaType(media.mimetype)) {
    case MediaType.Image: {
      const onImagePress = () => {
        nav.navigate("ImageScreen", { media });
      };
      return (
        <TouchableOpacity onPress={onImagePress}>
          <FastImage style={styles.image} source={{ uri: media.path }} />
        </TouchableOpacity>
      );
    }
    case MediaType.Text: {
      return (
        <HTML
          baseFontStyle={styles.htmlText}
          containerStyle={styles.textContainer}
          html=""
          uri={media.path}
        />
      );
    }
    case MediaType.Pdf: {
      const onPDFPress = () => {
        nav.navigate("PDFScreen", { media });
      };
      return (
        <View>
          <Pdf
            singlePage
            fitPolicy={1}
            style={styles.pdf}
            source={{ uri: media.path, cache: true }}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={onPDFPress}
          />
        </View>
      );
    }
    default: {
      return (
        <Caption style={[styles.textContainer, styles.unsupported]}>
          Unsupported media: {media.mimetype}
        </Caption>
      );
    }
  }
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 16,
  },
  unsupported: {
    fontStyle: "italic",
    color: Colors.grey600,
  },
  image: {
    maxHeight: 500,
    minHeight: 300,
    width: "100%",
  },
  pdf: {
    height: 200,
  },
  htmlText: {
    fontSize: 20,
  },
});

export default MediaThumb;

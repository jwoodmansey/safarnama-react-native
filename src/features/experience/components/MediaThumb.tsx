import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Video as ExpoVideo } from "expo-av";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Caption, Colors } from "react-native-paper";
import Pdf from "react-native-pdf";
import HTML from "react-native-render-html";
import { getPath } from "../../../store/mediaService";
import { MediaDocument } from "../../../types/common/media";
import { getMediaType, MediaType } from "../../../types/media";
import { MapNaviationProp } from "../../../types/nav/map";
import AudioPlayer from "./AudioPlayer";

type Props = {
  media: MediaDocument;
};

const MediaThumb: React.FC<Props> = ({ media }) => {
  const scheme = useColorScheme();
  const color = scheme === "light" ? Colors.black : Colors.white;
  const nav = useNavigation<StackNavigationProp<MapNaviationProp>>();
  const { colors } = useTheme();
  const [t] = useTranslation(["media"]);
  const { width } = useWindowDimensions();
  switch (getMediaType(media.mimetype)) {
    case MediaType.Image: {
      const onImagePress = () => {
        nav.navigate("ImageScreen", { media });
      };
      return (
        <TouchableOpacity onPress={onImagePress}>
          <FastImage
            style={styles.image}
            source={{
              uri: getPath(media),
            }}
          />
        </TouchableOpacity>
      );
    }
    case MediaType.Video: {
      return (
        <ExpoVideo
          useNativeControls
          usePoster={false}
          shouldPlay={false}
          style={styles.video}
          source={{ uri: getPath(media) }}
        />
      );
    }
    case MediaType.Audio: {
      return <AudioPlayer media={media} />;
    }
    case MediaType.Text: {
      return (
        <HTML
          baseStyle={styles.textContainer}
          contentWidth={width - 20}
          defaultTextProps={{
            style: { ...styles.htmlText, color },
          }}
          source={{ uri: getPath(media) }}
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
            style={[styles.pdf, { backgroundColor: colors.card }]}
            source={{ uri: getPath(media), cache: true }}
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
          {t("media:unsupportedMedia", { type: media.mimetype })}
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
  video: {
    height: 150,
    width: "100%",
  },
  audio: {
    height: 50,
    width: "100%",
  },
});

export default MediaThumb;

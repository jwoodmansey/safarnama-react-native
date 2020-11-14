import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Caption, Colors } from "react-native-paper";
import Pdf from "react-native-pdf";
import WebView from "react-native-webview";
import { MediaDocument } from "../types/common/media";
import { getMediaType, MediaType } from "../types/media";

type Props = {
  media: MediaDocument;
};

const MediaThumb: React.FC<Props> = ({ media }) => {
  const nav = useNavigation();
  const onPDFPress = () => {
    nav.navigate("PDFScreen", { media });
  };
  switch (getMediaType(media.mimetype)) {
    case MediaType.Image: {
      return <Image style={styles.image} source={{ uri: media.path }} />;
    }
    case MediaType.Text: {
      return <WebView source={{ uri: media.path }} />;
    }
    case MediaType.Pdf: {
      return (
        <View>
          <Pdf
            onPageSingleTap={onPDFPress}
            singlePage
            fitPolicy={1}
            style={styles.pdf}
            source={{ uri: media.path, cache: true }}
          />
          <TouchableOpacity
            style={[{ width: "100%", height: "100%", position: "absolute" }]}
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
});

export default MediaThumb;

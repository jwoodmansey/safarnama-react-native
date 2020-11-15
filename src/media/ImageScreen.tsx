import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import ImageZoom from "react-native-image-pan-zoom";
import { SafeAreaView } from "react-native-safe-area-context";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Caption, Colors } from "react-native-paper";
import { MapNaviationProp } from "../types/nav/map";
import AcknowledgementsOverlay from "./AcknowledgementsOverlay";

type Route = RouteProp<MapNaviationProp, "PDFScreen">;

const ImageScreen: React.FC = () => {
  const route = useRoute<Route>();
  const nav = useNavigation();
  const { media } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        edges={["right", "bottom", "left"]}
        style={StyleSheet.absoluteFill}
      >
        <ReactNativeZoomableView
          maxZoom={2}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders
        >
          <FastImage
            style={styles.image}
            resizeMode="contain"
            source={{ uri: media.path }}
          />
        </ReactNativeZoomableView>
      </SafeAreaView>
      <AcknowledgementsOverlay acknowledgements={media.acknowledgements} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: "100%",
  },
});

export default ImageScreen;

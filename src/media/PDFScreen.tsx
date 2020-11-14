import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { MediaDocument } from "../types/common/media";

type Route = RouteProp<{ PDFScreen: { media: MediaDocument } }, "PDFScreen">;

const PDFScreen: React.FC = () => {
  const route = useRoute<Route>();
  const { media } = route.params;
  return (
    <View style={StyleSheet.absoluteFill}>
      <Pdf source={{ uri: media.path }} style={StyleSheet.absoluteFill} />
    </View>
  );
};

export default PDFScreen;

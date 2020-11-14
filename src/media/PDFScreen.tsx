import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapNaviationProp } from "../types/nav/map";

type Route = RouteProp<MapNaviationProp, "PDFScreen">;

const PDFScreen: React.FC = () => {
  const route = useRoute<Route>();
  const { media } = route.params;
  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Pdf source={{ uri: media.path }} style={StyleSheet.absoluteFill} />
    </SafeAreaView>
  );
};

export default PDFScreen;

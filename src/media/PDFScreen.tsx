import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native-paper";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPath } from "../store/mediaService";
import { MapNaviationProp } from "../types/nav/map";
import AcknowledgementsOverlay from "./AcknowledgementsOverlay";

type Route = RouteProp<MapNaviationProp, "PDFScreen">;

const PDFScreen: React.FC = () => {
  const route = useRoute<Route>();
  const { media } = route.params;
  return (
    <View style={styles.container}>
      <SafeAreaView style={[StyleSheet.absoluteFill]}>
        <Pdf
          trustAllCerts={false}
          source={{ uri: getPath(media), cache: true }}
          style={styles.pdf}
        />
      </SafeAreaView>
      <AcknowledgementsOverlay acknowledgements={media.acknowledgements} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
  },
});

export default PDFScreen;

import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { TAG } from "../../../config";

const FundingLogos = require("../../../assets/images/funding_logos.jpg");

const PlaceFooter: React.FC = () => {
  if (TAG !== "Ports Past and Present") {
    return null;
  }
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.logoImage}
        source={FundingLogos}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  logoImage: {
    width: "100%",
    height: 100,
  },
});

export default PlaceFooter;

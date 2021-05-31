import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors } from "react-native-paper";
import { TAG } from "../../../config";

const FundingLogos = require("../../../assets/images/funding_logos.jpg");

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

const PlaceFooter: React.FC<Props> = ({ containerStyle }) => {
  if (TAG !== "Ports Past and Present") {
    return null;
  }
  return (
    <View style={[styles.container, containerStyle]}>
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
    width: "100%",
  },
  logoImage: {
    width: "100%",
    height: 100,
  },
});

export default PlaceFooter;

import React from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import FastImage from "react-native-fast-image";
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
        style={[styles.logoImage]}
        source={FundingLogos}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    overflow: "hidden",
  },
  logoImage: {
    height: 100,
    width: Dimensions.get("window").width - 40,
  },
});

export default PlaceFooter;

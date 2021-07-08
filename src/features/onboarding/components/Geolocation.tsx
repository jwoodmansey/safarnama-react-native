import LottieView from "lottie-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Platform, StyleSheet } from "react-native";

import BackgroundGeolocation from "react-native-background-geolocation";
import { Caption } from "react-native-paper";
import { deviceValue } from "../../../style/dimensions";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";

const PinAnimation = require("../../../assets/anim/location_pin.json");

type Props = {
  onNext: () => void;
};

const Geolocation: React.FC<Props> = ({ onNext }) => {
  const [t] = useTranslation(["onboarding", "glossary"]);
  const onPressEnable = async () => {
    await BackgroundGeolocation.startGeofences(() => {
      console.log("- Start success");
      onNext();
    });
  };

  return (
    <>
      <LottieView
        autoPlay
        resizeMode="contain"
        source={PinAnimation}
        style={styles.animation}
      />
      <Header
        title={t("onboarding:geolocation")}
        subheading={t("onboarding:geolocationSubtitle")}
      >
        <Caption style={styles.caption}>
          {Platform.OS === "ios" ? t("onboarding:geolocationSubtitleIOS") : ""}
          {"\n"}
          {t("onboarding:geolocationWontUseForAnythingElse")}
        </Caption>
      </Header>
      <View style={styles.container}>
        <PrimaryButton onPress={onPressEnable}>
          {t("onboarding:enableGeolocation")}
        </PrimaryButton>
        <PrimaryButton secondary onPress={onNext}>
          {t("glossary:skip")}
        </PrimaryButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    width: "100%",
  },
  animation: {
    height: deviceValue(100, 200),
  },
  subtitle: {
    fontSize: 14,
  },
  caption: {
    textAlign: "center",
  },
});

export default Geolocation;

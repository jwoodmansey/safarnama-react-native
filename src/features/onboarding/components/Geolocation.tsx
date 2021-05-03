import LottieView from "lottie-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { PixelRatio, Platform, StyleSheet } from "react-native";
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
        subheading={`${t("onboarding:geolocationSubtitle")}${
          Platform.OS === "ios" ? t("onboarding:geolocationSubtitleIOS") : ""
        }`}
      >
        <Caption style={styles.caption}>
          {t("onboarding:geolocationWontUseForAnythingElse")}
        </Caption>
      </Header>
      <PrimaryButton onPress={onPressEnable}>
        {t("onboarding:enableGeolocation")}
      </PrimaryButton>
      <PrimaryButton secondary onPress={onNext}>
        {t("glossary:skip")}
      </PrimaryButton>
    </>
  );
};

const styles = StyleSheet.create({
  animation: {
    height: deviceValue(100, 200),
    resizeMode: "contain",
  },
  caption: {
    textAlign: "center",
    marginTop: 16,
  },
});

export default Geolocation;

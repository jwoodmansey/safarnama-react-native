import React from "react";
import { useTranslation } from "react-i18next";
import { PixelRatio, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";

type Props = {
  onNext: () => void;
};

const Welcome: React.FC<Props> = ({ onNext }) => {
  const [t] = useTranslation(["onboarding", "glossary"]);
  return (
    <>
      <FastImage
        style={styles.imageStyle}
        // eslint-disable-next-line global-require
        source={require("../../../assets/images/master_logo.png")}
      />
      <Header
        title={t("onboarding:welcome")}
        subheading={t("onboarding:welcomeSubtitle")}
      />
      <PrimaryButton onPress={onNext}>{t("glossary:continue")}</PrimaryButton>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: PixelRatio.getPixelSizeForLayoutSize(135),
    marginBottom: 32,
  },
});

export default Welcome;

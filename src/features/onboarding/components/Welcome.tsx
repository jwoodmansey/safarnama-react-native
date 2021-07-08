import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { TAG } from "../../../config";
import { deviceValue } from "../../../style/dimensions";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";

type Props = {
  onNext: () => void;
};

const Welcome: React.FC<Props> = ({ onNext }) => {
  const [t] = useTranslation(["onboarding", "glossary"]);
  return (
    <>
      {TAG === "Ports Past and Present" ? (
        <FastImage
          style={styles.imageStyle}
          // eslint-disable-next-line global-require
          source={require("../../../assets/images/ppp_master_logo.png")}
        />
      ) : (
        <FastImage
          style={styles.imageStyle}
          // eslint-disable-next-line global-require
          source={require("../../../assets/images/master_logo.png")}
        />
      )}
      <Header
        title={t("onboarding:welcome")}
        subheading={t("onboarding:welcomeSubtitle")}
      />
      <View style={styles.button}>
        <PrimaryButton onPress={onNext}>{t("glossary:continue")}</PrimaryButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: deviceValue(200, 250, 300),
    width: deviceValue(200, 250, 300),
    marginBottom: 32,
  },
  button: {
    paddingBottom: 10,
    paddingHorizontal: 30,
    alignSelf: "stretch",
  },
});

export default Welcome;

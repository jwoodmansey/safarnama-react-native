import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";
import { deviceValue } from "../../../style/dimensions";
import { requestPushPermission } from "../../../utils/pushNotifications";

const PushAnimation = require("../../../assets/anim/push_notification.json");

type Props = {
  onNext: () => void;
};

const OnBoardingPushNotifications: React.FC<Props> = ({ onNext }) => {
  const [t] = useTranslation(["onboarding", "glossary"]);
  const onPressEnabled = async () => {
    await requestPushPermission();
    onNext();
  };
  return (
    <>
      <LottieView
        autoPlay
        resizeMode="contain"
        source={PushAnimation}
        style={styles.anim}
      />
      <Header
        title={t("onboarding:pushNotifications")}
        subheading={t("onboarding:pushNotificationsSubtitle")}
      />
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={onPressEnabled}>
          {t("onboarding:enablePushNotifications")}
        </PrimaryButton>
        <PrimaryButton secondary onPress={onNext}>
          {t("glossary:skip")}
        </PrimaryButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  anim: {
    height: deviceValue(150, 200),
    marginBottom: 32,
  },
});

export default OnBoardingPushNotifications;

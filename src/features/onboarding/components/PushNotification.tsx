import React from "react";
import LottieView from "lottie-react-native";
import PushNotification from "react-native-push-notification";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";
import { deviceValue } from "../../../style/dimensions";

const PushAnimation = require("../../../assets/anim/push_notification.json");

type Props = {
  onNext: () => void;
};

const OnBoardingPushNotifications: React.FC<Props> = ({ onNext }) => {
  const [t] = useTranslation(["onboarding", "glossary"]);
  const onPressEnabled = async () => {
    await PushNotification.requestPermissions(["alert", "badge", "sound"]);
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

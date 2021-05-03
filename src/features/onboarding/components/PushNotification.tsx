import React from "react";
import LottieView from "lottie-react-native";
import PushNotification from "react-native-push-notification";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";

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
      <PrimaryButton onPress={onPressEnabled}>
        {t("onboarding:enablePushNotifications")}
      </PrimaryButton>
      <PrimaryButton secondary onPress={onNext}>
        {t("glossary:skip")}
      </PrimaryButton>
    </>
  );
};

const styles = StyleSheet.create({
  anim: {
    height: 200,
    marginBottom: 32,
  },
});

export default OnBoardingPushNotifications;

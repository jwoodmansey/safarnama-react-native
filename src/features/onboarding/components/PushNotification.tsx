import React from "react";
import LottieView from "lottie-react-native";
import PushNotification from "react-native-push-notification";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";

const PushAnimation = require("../../../assets/anim/push_notification.json");

type Props = {
  onNext: () => void;
};

const OnBoardingPushNotifications: React.FC<Props> = ({ onNext }) => {
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
        style={{ height: 200 }}
      />
      <Header
        title="Push notifications"
        subheading="Enable push notifcations and we'll let you know when there's a
        nearby place when the app is closed."
      />
      <PrimaryButton onPress={onPressEnabled}>
        Enable Push Notifications
      </PrimaryButton>
      <PrimaryButton secondary onPress={onNext}>
        Skip
      </PrimaryButton>
    </>
  );
};

export default OnBoardingPushNotifications;

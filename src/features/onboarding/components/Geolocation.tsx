import React from "react";
import LottieView from "lottie-react-native";
import BackgroundGeolocation from "react-native-background-geolocation";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";

const PinAnimation = require("../../../assets/anim/location_pin.json");

type Props = {
  onNext: () => void;
};

const Geolocation: React.FC<Props> = ({ onNext }) => {
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
        style={{ height: 200 }}
      />
      <Header
        title="Geolocation"
        subheading="By enabling Safarnama access to your location, you can view your
        location on the map, and we can alert you to nearby places. 
        
        
        We won't use your location for anything else."
      />
      <PrimaryButton onPress={onPressEnable}>Enable Geolocation</PrimaryButton>
      <PrimaryButton secondary onPress={onNext}>
        Skip
      </PrimaryButton>
    </>
  );
};

export default Geolocation;

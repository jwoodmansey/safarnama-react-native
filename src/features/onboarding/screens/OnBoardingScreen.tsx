import { useNavigation } from "@react-navigation/core";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { complete } from "../../../store/onboarding/onboardingReducer";
import Geolocation from "../components/Geolocation";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import PushNotification from "../components/PushNotification";

const OnboardingScreen: React.FC = () => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get("window");

  const setSliderPage = (index: number) => () => {
    ref.current?.scrollTo({ x: width * index });
    // const { currentPage } = sliderState;
    // const { x } = event.nativeEvent.contentOffset;
    // const indexOfNextScreen = Math.floor(x / width);
    // if (indexOfNextScreen !== currentPage) {
    //   setSliderState({
    //     ...sliderState,
    //     currentPage: indexOfNextScreen,
    //   });
    // }
  };

  const { currentPage: pageIndex } = sliderState;
  const ref = useRef<ScrollView>(null);
  const nav = useNavigation();
  const dispatch = useDispatch();

  const onComplete = () => {
    nav.goBack();
    dispatch(complete());
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          scrollEventThrottle={16}
          pagingEnabled
          // scrollEnabled={false}
          ref={ref}
          showsHorizontalScrollIndicator={false}
          // onScroll={(event: any) => {
          //   setSliderPage(event);
          // }}
        >
          <View style={[styles.wrapper, { width }]}>
            <Header
              title="Welcome to Safarnama"
              subheading="With Safarnama you can download and explore curated cultural heritage experiences."
            />
            <PrimaryButton onPress={setSliderPage(1)}>Continue</PrimaryButton>
          </View>
          <View style={[styles.wrapper, { width }]}>
            <Geolocation onNext={setSliderPage(2)} />
          </View>
          <View style={[styles.wrapper, { width }]}>
            <PushNotification onNext={onComplete} />
          </View>
        </ScrollView>
        {/* <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                { opacity: pageIndex === index ? 1 : 0.2 },
              ]}
              key={index.toString()}
            />
          ))}
        </View> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: "100%",
  },
  wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 30,
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: "#0898A0",
    marginLeft: 10,
  },
  text: {
    textAlign: "center",
  },
});

export default OnboardingScreen;

import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { complete } from "../../../store/onboarding/onboardingReducer";
import Geolocation from "../components/Geolocation";
import PushNotification from "../components/PushNotification";
import Welcome from "../components/Welcome";

const OnboardingScreen: React.FC = () => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width } = Dimensions.get("window");

  const setSliderPage = (index: number) => () => {
    ref.current?.scrollTo({ x: width * index });
  };

  const { currentPage: pageIndex } = sliderState;
  const ref = useRef<ScrollView>(null);
  const nav = useNavigation();
  const dispatch = useDispatch();

  const onComplete = () => {
    nav.navigate("Drawer", { screen: "AddExperience" });
    dispatch(complete());
  };
  const onScroll = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  const onGeoComplete = () => {
    if (Platform.OS === "android") {
      onComplete();
    } else {
      setSliderPage(2)();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      <ScrollView
        style={styles.container}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        ref={ref}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      >
        <View style={[styles.wrapper, { width }]}>
          <Welcome onNext={setSliderPage(1)} />
        </View>
        <ScrollView contentContainerStyle={[styles.wrapper, { width }]}>
          <Geolocation onNext={onGeoComplete} />
        </ScrollView>
        {Platform.OS !== "android" && (
          <View style={[styles.wrapper, { width }]}>
            <PushNotification onNext={onComplete} />
          </View>
        )}
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Platform.OS === "ios" &&
          Array.from(Array(3).keys()).map((_, index) => (
            <View
              style={[
                styles.paginationDots,
                pageIndex === index ? {} : styles.paginationDotsInactive,
              ]}
              key={index.toString()}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 30,
    flex: 1,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: "20%",
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
    backgroundColor: Colors.blue500,
    marginLeft: 10,
  },
  paginationDotsInactive: {
    opacity: 0.2,
  },
});

export default OnboardingScreen;

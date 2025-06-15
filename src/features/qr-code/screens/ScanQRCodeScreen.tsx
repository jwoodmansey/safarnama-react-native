import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, View } from "react-native";
import { MD2Colors } from "react-native-paper";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { AddExperienceProp } from "../../../types/nav/addExperience";
import RequestPermissionView from "../components/RequestPermissionView";

const ScanQRCodeScreen: React.FC = () => {
  const nav =
    useNavigation<StackNavigationProp<AddExperienceProp, "ScanQRCodeScreen">>();
  const [t] = useTranslation(["manage"]);
  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: async (codes) => {
      let link = codes[0].value;
      if (!link) {
        return;
      }
      try {
        link = (await dynamicLinks().resolveLink(link)).url;
      } catch (e) {
        console.log("link was not a dynamic link");
      }
      const split = link.split("/");
      if (split[split.length - 2] === "download") {
        nav.navigate("ExperienceDetailsScreen", {
          experienceId: split[split.length - 1],
        });
      }
    },
  });
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const isFocused = useIsFocused();
  // const appState = useAppState()
  const isActive = isFocused;

  if (!hasPermission)
    return (
      <RequestPermissionView onPressRequestPermission={requestPermission} />
    );
  if (device == null) return null;

  return (
    <View style={styles.container}>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>{t("manage:qrCodePointAt")}</Text>
      </View>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={isActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructionsContainer: {
    zIndex: 10,
    margin: 40,
    top: 40,
    backgroundColor: MD2Colors.black,
    padding: 16,
    borderRadius: 8,
  },
  instructionsText: {
    textAlign: "center",
    color: MD2Colors.white,
    flexShrink: Platform.select({ ios: 1, android: 0 }),
    justifyContent: "center",
  },
});

export default ScanQRCodeScreen;

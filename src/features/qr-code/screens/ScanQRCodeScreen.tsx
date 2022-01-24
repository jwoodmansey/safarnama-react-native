import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BarCodeReadEvent } from "react-native-camera";
import { Colors } from "react-native-paper";
import QRCodeScanner from "react-native-qrcode-scanner";
import { AddExperienceProp } from "../../../types/nav/addExperience";

const ScanQRCodeScreen: React.FC = () => {
  const nav =
    useNavigation<StackNavigationProp<AddExperienceProp, "ScanQRCodeScreen">>();
  const onSuccess = async (event: BarCodeReadEvent) => {
    let link = event.data;
    try {
      link = (await dynamicLinks().resolveLink(event.data)).url;
    } catch (e) {
      console.log("link was not a dynamic link");
    }
    const split = link.split("/");
    if (split[split.length - 2] === "download") {
      nav.navigate("ExperienceDetailsScreen", {
        experienceId: split[split.length - 1],
      });
    }
  };
  const [t] = useTranslation(["manage"]);
  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker
      cameraProps={{ captureAudio: false }}
      topContent={
        <View style={styles.instructionsContainer}>
          <Text style={styles.insturctionsText}>
            {t("manage:qrCodePointAt")}
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  instructionsContainer: {
    zIndex: 10,
    margin: 40,
    top: 40,
    backgroundColor: Colors.black,
    padding: 16,
    borderRadius: 8,
  },
  insturctionsText: {
    textAlign: "center",
    color: Colors.white,
    flexShrink: Platform.select({ ios: 1, android: 0 }),
    justifyContent: "center",
  },
});

export default ScanQRCodeScreen;

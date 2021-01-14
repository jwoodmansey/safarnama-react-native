import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Colors, Title } from "react-native-paper";
import QRCodeScanner from "react-native-qrcode-scanner";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { BarCodeReadEvent } from "react-native-camera";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExperienceManagementProp } from "../../../types/nav/experienceManagement";

const ScanQRCodeScreen: React.FC = () => {
  const nav = useNavigation<
    StackNavigationProp<ExperienceManagementProp, "ScanQRCodeScreen">
  >();
  const onSuccess = async (event: BarCodeReadEvent) => {
    const resolvedLink = await dynamicLinks().resolveLink(event.data);
    const split = resolvedLink.url.split("/");
    Alert.alert(split[split.length - 1]);

    nav.navigate("ExperienceDetailsScreen", {
      experience: { _id: split[split.length - 1] },
    });
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker
      topContent={
        <View style={styles.instructionsContainer}>
          <Title style={styles.insturctionsText}>
            Point your camera at a Safarnama QR code
          </Title>
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
    justifyContent: "center",
  },
});

export default ScanQRCodeScreen;

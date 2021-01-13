import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors, Title } from "react-native-paper";
import QRCodeScanner from "react-native-qrcode-scanner";

const ScanQRCodeScreen: React.FC = () => {
  const onSuccess = () => {};
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

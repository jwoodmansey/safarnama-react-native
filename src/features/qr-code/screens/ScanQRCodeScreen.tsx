import React from "react";
import { Title } from "react-native-paper";
import QRCodeScanner from "react-native-qrcode-scanner";

const ScanQRCodeScreen: React.FC = () => {
  const onSuccess = () => {};
  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={<Title>Point your camera at a Safarnama QR code!</Title>}
    />
  );
};

export default ScanQRCodeScreen;

import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";

const QRAnimation = require("../../../assets/anim/qr_code.json");

const FeaturedHeader: React.FC = () => {
  const nav = useNavigation();
  const onPress = () => {
    nav.navigate("ScanQRCodeScreen");
  };
  const [t] = useTranslation(["manage"]);
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.qrContainer}>
        <View>
          <LottieView
            autoPlay
            resizeMode="contain"
            source={QRAnimation}
            style={styles.QRAnimation}
          />
        </View>
        <View style={styles.description}>
          <Title style={styles.description}>{t("manage:qrCode")}</Title>
          <Paragraph>{t("manage:qrCodeSubtitle")}</Paragraph>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
  },
  qrContainer: {
    flexDirection: "row",
  },
  QRAnimation: {
    height: 150,
    top: -5,
  },
  description: {
    flexShrink: 1,
  },
});

export default FeaturedHeader;

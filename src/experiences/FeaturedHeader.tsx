import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";

const QRAnimation = require("../assets/anim/qr_code.json");

const FeaturedHeader: React.FC = () => {
  const nav = useNavigation();
  const onPress = () => {};
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.qrContainer}>
        <View>
          <LottieView
            autoPlay
            // autoSize
            resizeMode="contain"
            source={QRAnimation}
            style={styles.QRAnimation}
          />
        </View>
        <View style={styles.description}>
          <Title style={styles.description}>QR Code</Title>
          <Paragraph>
            If you have a QR code for an experience, tap here. You can also
            download any featured experience from the list below.
          </Paragraph>
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
    // width: 150,
    height: 150,
    top: -5,
    // backgroundColor: Colors.blue100,
  },
  description: {
    flexShrink: 1,
  },
});

export default FeaturedHeader;

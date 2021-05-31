import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Linking, ScrollView, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Paragraph } from "react-native-paper";
import { TAG } from "../../config";

const AboutScreen: React.FC = () => {
  const [t, i18n] = useTranslation(["about"]);
  const openPortsLink = () => {
    Linking.openURL("https://portspastpresent.eu/ports");
  };
  const openProgrammeLink = () => {
    switch (i18n.language) {
      case "cy": {
        Linking.openURL("https://irelandwales.eu/cy");
        break;
      }
      default:
      case "en": {
        Linking.openURL("https://irelandwales.eu");
        break;
      }
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {TAG === "Ports Past and Present" ? (
        <FastImage
          style={styles.image}
          // eslint-disable-next-line global-require
          source={require("../../assets/images/ppp_master_logo.png")}
        />
      ) : (
        <FastImage
          style={styles.image}
          // eslint-disable-next-line global-require
          source={require("../../assets/images/master_logo.png")}
        />
      )}
      <Trans i18n={i18n} t={t} i18nKey="about:aboutFull">
        <Paragraph style={styles.text}>
          <Paragraph style={styles.link} onPress={openPortsLink}>
            Link 1
          </Paragraph>
          <Paragraph style={styles.link} onPress={openProgrammeLink}>
            Link 2
          </Paragraph>
        </Paragraph>
      </Trans>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default AboutScreen;

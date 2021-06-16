import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const PrivacyScreen: React.FC = () => {
  const [t, i18n] = useTranslation(["settings"]);
  return (
    <ScrollView style={styles.container}>
      <RadioButton.Group
        onValueChange={(newValue) => i18n.changeLanguage(newValue)}
        value={i18n.language}
      >
        <RadioButton.Item label={t("settings:language.english")} value="en" />
        <RadioButton.Item label={t("settings:language.welsh")} value="cy" />
      </RadioButton.Group>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // padding: 20,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  label: {
    fontWeight: "500",
  },
  button: {
    marginTop: 32,
  },
});

export default PrivacyScreen;

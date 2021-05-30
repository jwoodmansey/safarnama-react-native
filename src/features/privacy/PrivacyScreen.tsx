import crashlytics from "@react-native-firebase/crashlytics";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Paragraph, Subheading, Switch } from "react-native-paper";

const PrivacyScreen: React.FC = () => {
  const [t] = useTranslation(["settings"]);
  const [enabled, setEnabled] = useState(
    crashlytics().isCrashlyticsCollectionEnabled
  );

  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }

  return (
    <View style={styles.container}>
      <Subheading>{t("settings:privacy.errorReporting")}</Subheading>
      <Paragraph>{t("settings:privacy.helpImprove")}</Paragraph>
      <View style={styles.labelRow}>
        <Paragraph style={styles.label}>
          {t("settings:privacy.optInToErrorReporting")}
        </Paragraph>
        <Switch value={enabled} onValueChange={toggleCrashlytics} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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
});

export default PrivacyScreen;

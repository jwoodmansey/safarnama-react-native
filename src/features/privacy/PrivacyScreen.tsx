import crashlytics from "@react-native-firebase/crashlytics";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph, Subheading, Switch } from "react-native-paper";
import { PRIVACY_URL } from "../../config";
import { openInAppBrowser } from "../../utils/linking";

const PrivacyScreen: React.FC = () => {
  const [t] = useTranslation(["settings"]);
  const [enabled, setEnabled] = useState(
    crashlytics().isCrashlyticsCollectionEnabled
  );
  const onPressPrivacyPolicy = () => {
    openInAppBrowser(PRIVACY_URL);
  };

  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }

  return (
    <ScrollView style={styles.container}>
      <Subheading>{t("settings:privacy.errorReporting")}</Subheading>
      <Paragraph>{t("settings:privacy.helpImprove")}</Paragraph>
      <View style={styles.labelRow}>
        <Paragraph style={styles.label}>
          {t("settings:privacy.optInToErrorReporting")}
        </Paragraph>
        <Switch value={enabled} onValueChange={toggleCrashlytics} />
      </View>
      <Button
        style={styles.button}
        mode="outlined"
        onPress={onPressPrivacyPolicy}
      >
        {t("settings:privacy.viewPrivacyPolicy")}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

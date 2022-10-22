import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Paragraph, Subheading, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setQuickExperienceSwitching } from "../../../store/settings/settingsReducer";
import { selectQuickExperienceSwitching } from "../../../store/settings/settingsSelector";

const SettingsScreen: React.FC = () => {
  const [t] = useTranslation(["settings"]);
  const dispatch = useDispatch();
  const isQuickExperienceSwitchingEnabled = useSelector(
    selectQuickExperienceSwitching
  );
  const toggleQuickExperienceSwitching = (value: boolean) => {
    dispatch(setQuickExperienceSwitching(value));
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Subheading>{t("settings:privacy.errorReporting")}</Subheading>
      <Paragraph>{t("settings:privacy.helpImprove")}</Paragraph> */}
      <View style={styles.labelRow}>
        <Paragraph style={styles.label}>
          {t("settings:customise.quickExperienceSwitching")}
        </Paragraph>
        <Switch
          value={isQuickExperienceSwitchingEnabled}
          onValueChange={toggleQuickExperienceSwitching}
        />
      </View>
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

export default SettingsScreen;

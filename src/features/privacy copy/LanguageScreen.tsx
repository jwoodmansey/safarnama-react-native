import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  changeLanguage,
  LanguageSetting,
} from "../../store/settings/settingsReducer";

const PrivacyScreen: React.FC = () => {
  const [t, i18n] = useTranslation(["settings"]);
  const dispatch = useDispatch();
  const onChangeLanguage = (str: string) => {
    dispatch(changeLanguage(str as LanguageSetting));
  };
  return (
    <ScrollView style={styles.container}>
      <RadioButton.Group onValueChange={onChangeLanguage} value={i18n.language}>
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
  },
});

export default PrivacyScreen;

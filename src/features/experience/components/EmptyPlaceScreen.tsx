import { useTheme } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Subheading, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const EmptyPlaceScreen: React.FC = () => {
  const { colors } = useTheme();
  const [t] = useTranslation(["media"]);
  return (
    <SafeAreaView edges={["bottom"]} style={styles.emptyContainer}>
      <MaterialCommunityIcon
        color={colors.text}
        size={32}
        name="information-outline"
      />
      <Title>{t("media:noMedia")}</Title>
      <Subheading style={styles.subHeading}>
        {t("media:noMediaSubtitle")}
      </Subheading>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 64,
    flex: 1,
    justifyContent: "center",
    maxWidth: 300,
    alignItems: "center",
    alignSelf: "center",
  },
  subHeading: {
    textAlign: "center",
  },
});

export default EmptyPlaceScreen;

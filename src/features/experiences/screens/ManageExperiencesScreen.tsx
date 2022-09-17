import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Button, Subheading, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { selectMyExperiences } from "../../../store/experience/experienceSelectors";
import { scrollIndicatorInsets } from "../../../style/dimensions";
import { ExperienceSnapshotData } from "../../../types/common/experience";
import ExperienceItem from "../components/ExperienceItem";

const ManageExperiencesScreen: React.FC = () => {
  const data = useSelector(selectMyExperiences);
  const renderItem: ListRenderItem<ExperienceSnapshotData> = ({ item }) => (
    <ExperienceItem experience={item} />
  );
  const { colors } = useTheme();
  const nav = useNavigation();
  const onPressFind = () => {
    nav.navigate("AddExperience", { screen: "FeaturedExperienceScreen" });
  };
  const [t] = useTranslation(["manage"]);
  const keyExtractor = (experience: ExperienceSnapshotData) => experience._id;
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={Object.values(data)}
      renderItem={renderItem}
      ListEmptyComponent={
        <SafeAreaView edges={["bottom"]} style={styles.emptyContainer}>
          <MaterialCommunityIcon
            color={colors.text}
            size={32}
            name="information-outline"
          />
          <Title>{t("manage:noExperiences")}</Title>
          <Subheading style={styles.subHeading}>
            {t("manage:noExeriencesSubtitle")}
          </Subheading>
          <Button onPress={onPressFind} mode="outlined">
            {t("manage:findExperiences")}
          </Button>
        </SafeAreaView>
      }
      keyExtractor={keyExtractor}
      scrollIndicatorInsets={scrollIndicatorInsets}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 300,
    alignItems: "center",
    alignSelf: "center",
  },
  subHeading: {
    textAlign: "center",
    marginBottom: 20,
  },
});

export default ManageExperiencesScreen;

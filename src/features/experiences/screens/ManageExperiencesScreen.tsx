import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Button, Subheading, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { selectExperiences } from "../../../store/experience/experienceSelectors";
import { ExperienceSnapshotData } from "../../../types/common/experience";
import ExperienceItem from "../components/ExperienceItem";

const ManageExperiencesScreen: React.FC = () => {
  const data = useSelector(selectExperiences);
  const renderItem: ListRenderItem<ExperienceSnapshotData> = ({ item }) => (
    <ExperienceItem experience={item} />
  );
  const { colors } = useTheme();
  const nav = useNavigation();
  const onPressFind = () => {
    nav.navigate("AddExperience", { screen: "FeaturedExperienceScreen" });
  };
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
          <Title>No experiences</Title>
          <Subheading style={styles.subHeading}>
            You have not started any experiences yet. Find one to get started.
          </Subheading>
          <Button onPress={onPressFind} mode="outlined">
            Find experiences
          </Button>
        </SafeAreaView>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 275,
    alignItems: "center",
    alignSelf: "center",
  },
  subHeading: {
    textAlign: "center",
    marginBottom: 20,
  },
});

export default ManageExperiencesScreen;

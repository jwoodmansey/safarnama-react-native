import React from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectExperiences } from "../../../store/experience/experienceSelectors";
import { ExperienceSnapshotData } from "../../../types/common/experience";

const ManageExperiencesScreen: React.FC = () => {
  const data = useSelector(selectExperiences);
  const renderItem: ListRenderItem<ExperienceSnapshotData> = ({ item }) => (
    <Text>{item.data.name}</Text>
  );
  return <FlatList data={Object.values(data)} renderItem={renderItem} />;
};

export default ManageExperiencesScreen;

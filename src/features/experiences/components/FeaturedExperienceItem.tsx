import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ExperienceRefData } from "../../../types/common/experience";
import { AddExperienceProp } from "../../../types/nav/addExperience";

type Props = {
  experience: ExperienceRefData;
};

type Nav = StackNavigationProp<AddExperienceProp, "FeaturedExperienceScreen">;

const FeaturedExperienceItem: React.FC<Props> = ({ experience }) => {
  const nav = useNavigation<Nav>();
  const onPress = () => {
    nav.navigate("ExperienceDetailsScreen", { experience });
  };
  return (
    <Card onPress={onPress} style={styles.card}>
      {/* <Card.Cover source={experience.}/> */}
      <Card.Title
        title={experience.name}
        subtitle={experience.description}
        subtitleNumberOfLines={3}
        style={styles.title}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  title: {
    padding: 16,
  },
});

export default FeaturedExperienceItem;

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ExperienceRefData } from "../../../types/common/experience";
import { RootStackScreenProps } from "../../../types/nav/root";

type Props = {
  experience: ExperienceRefData;
};

const FeaturedExperienceItem: React.FC<Props> = ({ experience }) => {
  const nav =
    useNavigation<RootStackScreenProps<"AddExperience">["navigation"]>();
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

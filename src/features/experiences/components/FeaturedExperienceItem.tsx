import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Card, Text } from "react-native-paper";
import { ExperienceRefData } from "../../../types/common/experience";
import { ExperienceManagementProp } from "../../../types/nav/experienceManagement";

type Props = {
  experience: ExperienceRefData;
};

type Nav = StackNavigationProp<
  ExperienceManagementProp,
  "FeaturedExperienceScreen"
>;

const FeaturedExperienceItem: React.FC<Props> = ({ experience }) => {
  const nav = useNavigation<Nav>();
  const onPress = () => {
    nav.navigate("ExperienceDetailsScreen", { experience });
  };
  return (
    <Card
      onPress={onPress}
      style={{ marginLeft: 16, marginRight: 16, marginBottom: 16 }}
    >
      {/* <Card.Cover source={experience.}/> */}
      <Card.Title
        title={experience.name}
        subtitle={experience.description}
        subtitleNumberOfLines={3}
        style={{ padding: 16 }}
      />
      {/* <Card.Content> */}
      {/* <Text>{JSON.stringify(experience)}</Text> */}
      {/* <Card. */}
      {/* <Paragraph numberOfLines={3}>{experienc/e.description}</Paragraph> */}
      {/* </Card.Content> */}
    </Card>
  );
};

export default FeaturedExperienceItem;

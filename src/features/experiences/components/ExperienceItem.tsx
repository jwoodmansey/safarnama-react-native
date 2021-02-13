import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, LayoutAnimation, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  removeExperience,
  setSelectedExperience,
} from "../../../store/experience/experienceReducer";
import { ExperienceSnapshotData } from "../../../types/common/experience";
import { AddExperienceProp } from "../../../types/nav/addExperience";

type Props = {
  experience: ExperienceSnapshotData;
};

type Nav = StackNavigationProp<AddExperienceProp, "FeaturedExperienceScreen">;

const ExperienceItem: React.FC<Props> = ({ experience }) => {
  const nav = useNavigation<Nav>();
  const dispatch = useDispatch();
  const onPress = () => {
    nav.navigate("ExperienceDetailsScreen", {
      experience: experience.data,
    });
  };
  const onPressPlay = () => {
    dispatch(setSelectedExperience({ id: experience.data._id }));
    nav.navigate("MapScreen");
  };
  const onPressRemove = () => {
    Alert.alert(
      "Remove experience?",
      "Are you sure you want to remove this experience?",
      [
        { style: "cancel", text: "Cancel" },
        {
          style: "destructive",
          text: "Remove",
          onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            dispatch(removeExperience({ id: experience.data._id }));
          },
        },
      ]
    );
  };
  const onPressDownload = () => {};
  return (
    <Card onPress={onPress} style={styles.card}>
      {/* <Card.Cover source={experience.}/> */}
      <Card.Title
        title={experience.data.name}
        subtitle={experience.data.description}
        subtitleNumberOfLines={3}
        style={styles.title}
      />
      <Card.Actions>
        <Button onPress={onPressPlay}>Play</Button>
        <Button onPress={onPressRemove}>Remove</Button>
        {experience.downloaded ? (
          <Button disabled>Downloaded</Button>
        ) : (
          <Button onPress={onPressDownload} icon="download">
            Download
          </Button>
        )}
      </Card.Actions>
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

export default ExperienceItem;

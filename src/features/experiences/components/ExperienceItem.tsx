import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, LayoutAnimation, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  downloadExperienceMedia,
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
    nav.navigate<any>("MapScreen");
  };
  const onPressRemove = () => {
    Alert.alert(t("manage:removeExperience"), t("manage:removeExplanation"), [
      { style: "cancel", text: t("glossary:cancel") },
      {
        style: "destructive",
        text: t("manage:remove"),
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          dispatch(removeExperience({ id: experience.data._id }));
        },
      },
    ]);
  };
  const onPressDownload = () => {
    dispatch(downloadExperienceMedia({ id: experience.data._id }));
  };
  const [t] = useTranslation(["manage", "glossary"]);
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
        <Button onPress={onPressPlay}>{t("manage:play")}</Button>
        <Button onPress={onPressRemove}>{t("manage:remove")}</Button>
        {experience.downloaded ? (
          <Button disabled>{t("manage:downloaded")}</Button>
        ) : (
          <Button onPress={onPressDownload} icon="download">
            {t("manage:download")}
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

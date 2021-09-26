import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Button, Chip, Paragraph, ProgressBar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import {
  downloadExperienceMedia,
  loadExperience,
  setSelectedExperience,
} from "../../../store/experience/experienceReducer";
import { selectExperience } from "../../../store/experience/experienceSelectors";
import { RootState } from "../../../store/rootReducer";
import { ExperienceSnapshotData } from "../../../types/common/experience";
import { ExperienceManagementProp } from "../../../types/nav/experienceManagement";
import AuthorDetails from "../../experiences/components/AuthorDetails";

type Route = RouteProp<ExperienceManagementProp, "ExperienceDetailsScreen">;

const ExperienceDetailsScreen: React.FC = () => {
  const nav = useNavigation();
  const route = useRoute<Route>();
  const { experience, experienceId } = route.params;
  const id = experience?._id || experienceId || "";
  const dispatch = useDispatch();
  const [isAuthorModalVisible, setAuthorModalVisible] = useState(false);
  const experienceSnapshot = useSelector<
    RootState,
    ExperienceSnapshotData | undefined
  >((state) => selectExperience(state, id));
  useEffect(() => {
    dispatch(loadExperience({ id }));
  }, [dispatch, id]);
  const onPressAuthor = (open: boolean) => () => {
    setAuthorModalVisible(open);
  };
  const ref = useRef<MapView>(null);

  useEffect(() => {
    if (experienceSnapshot) {
      ref.current?.fitToCoordinates(
        experienceSnapshot.data.pointOfInterests?.map((p) => ({
          latitude: p.location.coordinates[1],
          longitude: p.location.coordinates[0],
        }))
      );
      nav.setOptions({
        title: experienceSnapshot.data.name,
      });
    }
  }, [experienceSnapshot, nav]);
  const [t] = useTranslation(["manage", "glossary"]);
  if (!experienceSnapshot) {
    return <ProgressBar />;
  }
  const sizeInMb = (experienceSnapshot.metaData.size / 1000000).toFixed(2);
  const onPressPlay = () => {
    dispatch(setSelectedExperience({ id: experienceSnapshot?.data._id }));
    nav.goBack();
    nav.navigate("MapScreen");
  };
  const onPressDownload = () => {
    Alert.alert(
      t("manage:downloadExperience"),
      t("manage:downloadExplanation"),
      [
        { text: t("glossary:cancel"), style: "cancel" },
        {
          text: t("manage:downloadSizeInMb", { sizeInMb }),
          style: "default",
          onPress: () => {
            dispatch(downloadExperienceMedia({ id }));
          },
        },
      ]
    );
  };
  const padding = 10;
  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
        liteMode
        scrollEnabled={false}
        zoomEnabled={false}
        mapPadding={{
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
        }}
        style={styles.map}
        rotateEnabled={false}
      >
        {experienceSnapshot &&
          experienceSnapshot.data.pointOfInterests?.map((p) => (
            <Marker
              key={p._id}
              coordinate={{
                latitude: p.location.coordinates[1],
                longitude: p.location.coordinates[0],
              }}
            />
          ))}
      </MapView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          {experienceSnapshot.data.description && (
            <Paragraph style={styles.description}>
              {experienceSnapshot.data.description}
            </Paragraph>
          )}
          <Chip
            onPress={onPressAuthor(true)}
            style={styles.author}
            avatar={
              experienceSnapshot.metaData.ownerPublicProfile.photoURL ? (
                <FastImage
                  source={{
                    uri:
                      experienceSnapshot.metaData.ownerPublicProfile.photoURL,
                  }}
                />
              ) : (
                <MaterialCommunityIcon size={24} name="account-circle" />
              )
            }
          >
            {experienceSnapshot.metaData.ownerPublicProfile.displayName}
          </Chip>
          <Button
            onPress={onPressPlay}
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {t("manage:playExperience")}
          </Button>
          <Button
            disabled={experienceSnapshot.downloaded}
            onPress={onPressDownload}
            mode="text"
          >
            {experienceSnapshot.downloaded
              ? t("manage:downloaded")
              : t("manage:downloadSizeInMb", { sizeInMb })}
          </Button>
        </View>
      </ScrollView>
      <AuthorDetails
        onHide={onPressAuthor(false)}
        isVisible={isAuthorModalVisible}
        author={experienceSnapshot.metaData.ownerPublicProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "33%",
    width: "100%",
  },
  scrollView: {
    padding: 24,
    flexGrow: 1,
  },
  button: {
    marginBottom: 12,
  },
  buttonContent: {
    padding: 12,
  },
  description: {
    marginBottom: 20,
  },
  author: {
    alignSelf: "flex-start",
    marginBottom: 32,
  },
});

export default ExperienceDetailsScreen;

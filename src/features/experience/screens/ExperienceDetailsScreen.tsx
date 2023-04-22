import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, LayoutAnimation, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Button, Chip, Paragraph, ProgressBar } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadExperienceMedia,
  loadExperience,
  setSelectedExperience,
} from "../../../store/experience/experienceReducer";
import { selectExperience } from "../../../store/experience/experienceSelectors";
import { RootState } from "../../../store/rootReducer";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../../types/common/experience";
import { ExperienceManagementProp } from "../../../types/nav/experienceManagement";
import AuthorDetails from "../../experiences/components/AuthorDetails";

type Route = RouteProp<ExperienceManagementProp, "ExperienceDetailsScreen">;

const ExperienceDetailsScreen: React.FC = () => {
  const nav = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<Route>();
  const { experience, experienceId } = route.params;
  const id = experience?._id || experienceId;
  const dispatch = useDispatch();
  const [isAuthorModalVisible, setAuthorModalVisible] = useState(false);

  const experienceSnapshot = useSelector<
    RootState,
    ExperienceSnapshotData | undefined
  >((state) => selectExperience(state, id));
  useEffect(() => {
    if (id) {
      dispatch(loadExperience({ id }));
    }
  }, [dispatch, id]);
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

  // This is so we can display some data from the ref, even if we don't have a complete snapshot yet
  const displayExperience: ExperienceRefData | undefined = useMemo(() => {
    if (experience) return experience;
    if (experienceSnapshot)
      return {
        _id: experienceSnapshot.data._id,
        snapshotId: experienceSnapshot._id,
        name: experienceSnapshot.data.name,
        description: experienceSnapshot.data.description,
        metaData: experienceSnapshot.metaData,
      };
    return undefined;
  }, [experienceSnapshot, experience]);

  if (!displayExperience) {
    return <ProgressBar />;
  }

  const onPressAuthor = (open: boolean) => () => {
    setAuthorModalVisible(open);
  };
  const onPressPlay = () => {
    if (id) {
      dispatch(setSelectedExperience({ id }));
      nav.popToTop();
      nav.navigate("MapScreen", {});
    }
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
            if (id) {
              onPressPlay();
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              dispatch(downloadExperienceMedia({ id }));
            }
          },
        },
      ]
    );
  };
  const sizeInMb = (displayExperience.metaData.size / 1000000).toFixed(2);

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
          {displayExperience.description ? (
            <Paragraph style={styles.description}>
              {displayExperience.description}
            </Paragraph>
          ) : null}
          <View style={styles.author}>
            <Chip
              onPress={onPressAuthor(true)}
              avatar={
                displayExperience.metaData.ownerPublicProfile.photoURL ? (
                  <FastImage
                    source={{
                      uri: displayExperience.metaData.ownerPublicProfile
                        .photoURL,
                    }}
                  />
                ) : (
                  <MaterialCommunityIcon size={24} name="account-circle" />
                )
              }
            >
              {displayExperience.metaData.ownerPublicProfile.displayName}
            </Chip>
          </View>
          <Button
            onPress={onPressPlay}
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {t("manage:playExperience")}
          </Button>
          <Button
            disabled={experienceSnapshot?.downloaded}
            onPress={onPressDownload}
            icon={experienceSnapshot?.downloaded ? "map-check" : undefined}
            mode="text"
          >
            {experienceSnapshot?.downloaded
              ? t("manage:downloaded")
              : t("manage:downloadSizeInMb", { sizeInMb })}
          </Button>
        </View>
      </ScrollView>
      <AuthorDetails
        onHide={onPressAuthor(false)}
        isVisible={isAuthorModalVisible}
        author={displayExperience.metaData.ownerPublicProfile}
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
    flexDirection: "row",
    marginBottom: 32,
  },
});

export default ExperienceDetailsScreen;

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Button, Chip, Paragraph, ProgressBar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
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
    }
  }, [experienceSnapshot]);
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
      "Download experience?",
      `This will allow you to view this experience's media while offline.\n\nIt cannot guarantee that the map layer will be visible while offline.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: `Download (${sizeInMb}Mb)`,
          style: "default",
          onPress: () => {
            dispatch(downloadExperienceMedia({ id }));
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
        liteMode
        scrollEnabled={false}
        zoomEnabled={false}
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
          <Paragraph style={styles.description}>
            {experienceSnapshot.data.description}
            {/* {JSON.stringify(experience)} */}
          </Paragraph>
          <Chip
            onPress={onPressAuthor(true)}
            style={styles.author}
            avatar={
              <FastImage
                source={{
                  uri: experienceSnapshot.metaData.ownerPublicProfile.photoURL,
                }}
              />
            }
          >
            {experienceSnapshot.metaData.ownerPublicProfile.displayName}
          </Chip>
          <Button onPress={onPressPlay} mode="contained" style={styles.button}>
            Play Experience
          </Button>
          <Button
            disabled={experienceSnapshot.downloaded}
            onPress={onPressDownload}
            mode="text"
          >
            {experienceSnapshot.downloaded
              ? "Downloaded"
              : `Download (${(
                  experienceSnapshot.metaData.size / 1000000
                ).toFixed(2)} mb)`}
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
    padding: 12,
    marginBottom: 12,
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

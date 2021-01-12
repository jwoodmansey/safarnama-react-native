/* eslint-disable no-underscore-dangle */
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Button, Chip, Paragraph } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { RootState } from "../../store/configure";
import {
  loadExperience,
  setSelectedExperience,
} from "../../store/experience/experienceReducer";
import { selectExperience } from "../../store/experience/experienceSelectors";
import { ExperienceSnapshotData } from "../../types/common/experience";
import { ExperienceManagementProp } from "../../types/nav/experienceManagement";
import AuthorDetails from "./components/AuthorDetails";

type Route = RouteProp<ExperienceManagementProp, "ExperienceDetailsScreen">;

const ExperienceDetailsScreen: React.FC = () => {
  const nav = useNavigation();
  const route = useRoute<Route>();
  const { experience } = route.params;
  const authorRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch();
  const experienceSnapshot = useSelector<
    RootState,
    ExperienceSnapshotData | undefined
  >((state) => selectExperience(state, experience._id));
  useEffect(() => {
    dispatch(loadExperience({ id: experience._id }));
  }, [dispatch, experience._id]);
  const onPressAuthor = () => {
    authorRef.current?.snapTo(1);
  };
  const ref = useRef<MapView>(null);
  const onPressPlay = () => {
    dispatch(setSelectedExperience({ id: experienceSnapshot?.data._id }));
    nav.goBack();
    nav.navigate("MapScreen");
  };
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
              // pinColor={Colors.blue100}
              coordinate={{
                latitude: p.location.coordinates[1],
                longitude: p.location.coordinates[0],
              }}
            />
          ))}
      </MapView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Paragraph style={styles.description}>
          {experience.description}
          {/* {JSON.stringify(experience)} */}
        </Paragraph>
        <Chip
          onPress={onPressAuthor}
          style={styles.author}
          avatar={
            <FastImage
              // style={{ height: 20, width: 20 }}
              source={{ uri: experience.metaData.ownerPublicProfile.photoURL }}
            />
          }
        >
          {experience.metaData.ownerPublicProfile.displayName}
        </Chip>
        <Button onPress={onPressPlay} mode="contained" style={styles.button}>
          Play Experience
        </Button>
        <Button mode="text">
          Download ({(experience.metaData.size / 1000000).toFixed(2)}mb)
        </Button>
      </ScrollView>
      <BottomSheet
        borderRadius={16}
        snapPoints={[0, 300]}
        initialSnap={0}
        ref={authorRef}
        renderContent={() => (
          <AuthorDetails author={experience.metaData.ownerPublicProfile} />
        )}
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
    margin: 24,
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

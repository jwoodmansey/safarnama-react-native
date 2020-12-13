import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ScrollView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { Button, Chip, Paragraph, Title } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import { ExperienceManagementProp } from "../types/nav/experienceManagement";
import AuthorDetails from "./components/AuthorDetails";

type Route = RouteProp<ExperienceManagementProp, "ExperienceDetailsScreen">;

const ExperienceDetailsScreen: React.FC = () => {
  const route = useRoute<Route>();
  const { experience } = route.params;
  console.log(experience);
  const authorRef = useRef<BottomSheet>(null);
  const onPressAuthor = () => {
    authorRef.current?.snapTo(1);
  };
  return (
    <View style={styles.container}>
      <MapView
        liteMode
        scrollEnabled={false}
        zoomEnabled={false}
        style={styles.map}
      />
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
        <Button mode="contained" style={styles.button}>
          Play Experience
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

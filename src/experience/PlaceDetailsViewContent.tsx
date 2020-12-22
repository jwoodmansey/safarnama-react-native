import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { PointOfInterestDocument } from "../types/common/point-of-interest";
import MediaItem from "./MediaItem";

type Props = {
  place?: PointOfInterestDocument;
};

const PlaceDetailsViewContent: React.FC<Props> = ({ place }) => {
  if (!place) return null;

  return (
    // This SHOULD be a flat list but it's tricky to get it working in the modal, re-visit
    //   <FlatList
    //   nestedScrollEnabled
    //   contentContainerStyle={styles.panel}
    //   ListHeaderComponent={() => (
    //     <Title style={styles.panelTitle}>{place.name}</Title>
    //   )}
    //   data={place.media}
    //   keyExtractor={(m) => m._id}
    //   renderItem={({ item }) => <MediaItem media={item} />}
    // />
    <View style={styles.panel}>
      <Title style={styles.panelTitle}>{place.name}</Title>
      {place.media.map((m) => (
        // eslint-disable-next-line no-underscore-dangle
        <MediaItem key={m._id} media={m} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: "#f7f5eee8",
    minHeight: Dimensions.get("screen").height * 0.8,
  },
  panelTitle: {
    fontSize: 27,
    marginBottom: 16,
    color: "black",
  },
});

export default PlaceDetailsViewContent;

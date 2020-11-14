import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { PointOfInterestDocument } from "../types/common/point-of-interest";
import MediaItem from "./MediaItem";

type Props = {
  place?: PointOfInterestDocument;
};

const PlaceDetailsViewContent: React.FC<Props> = ({ place }) => {
  if (!place) return null;

  return (
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
  },
  panelTitle: {
    fontSize: 27,
    marginBottom: 16,
    color: "black",
  },
});

export default PlaceDetailsViewContent;

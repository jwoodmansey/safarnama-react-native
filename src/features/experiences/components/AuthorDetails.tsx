import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Colors, Paragraph, Title } from "react-native-paper";
import Animated from "react-native-reanimated";
import { rgbToRgba } from "../../../style/colors";
import { PublicProfile } from "../../../types/common/experience";

type Props = {
  author: PublicProfile;
};

const AuthorDetails: React.FC<Props> = ({ author }) => {
  const theme = useTheme();
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: rgbToRgba(theme.colors.card, 0.9),
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Avatar.Image size={48} source={{ uri: author.photoURL }} />
        <Title style={styles.title}>{author.displayName}</Title>
      </View>
      <Paragraph>{author.bio}</Paragraph>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    minHeight: 300,
    padding: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    marginLeft: 12,
  },
});

export default AuthorDetails;

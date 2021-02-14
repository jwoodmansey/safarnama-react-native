import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Colors, Paragraph, Title } from "react-native-paper";
import Animated from "react-native-reanimated";
import Modal from "react-native-modal";
import { rgbToRgba } from "../../../style/colors";
import { PublicProfile } from "../../../types/common/experience";

type Props = {
  author: PublicProfile;
  isVisible: boolean;
  onHide: () => void;
};

const AuthorDetails: React.FC<Props> = ({ author, isVisible, onHide }) => {
  const theme = useTheme();
  return (
    <Modal
      style={styles.modal}
      hasBackdrop
      isVisible={isVisible}
      swipeDirection="down"
      onDismiss={onHide}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
    >
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
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

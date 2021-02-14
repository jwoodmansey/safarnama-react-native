import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Avatar, Colors, Paragraph, Title } from "react-native-paper";
import Animated from "react-native-reanimated";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { PublicProfile } from "../../../types/common/experience";

type Props = {
  author: PublicProfile;
  isVisible: boolean;
  onHide: () => void;
};

const AuthorDetails: React.FC<Props> = ({ author, isVisible, onHide }) => {
  const { colors } = useTheme();
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
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.titleContainer}>
          {author.photoURL ? (
            <Avatar.Image size={48} source={{ uri: author.photoURL }} />
          ) : (
            <MaterialCommunityIcon size={48} name="account-circle" />
          )}
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
    color: Colors.white,
  },
  container: {
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

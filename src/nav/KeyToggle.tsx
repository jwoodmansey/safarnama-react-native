import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { toggleKeyModal } from "../store/experience/experienceReducer";

const KeyToggle: React.FC = () => {
  const dispatch = useDispatch();
  const onPress = () => dispatch(toggleKeyModal(true));

  const nav = useNavigation();

  const onPressList = () => {
    nav.navigate("PlaceListScreen");
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <IconButton onPress={onPressList} icon="format-list-bulleted-triangle" />
      <IconButton onPress={onPress} icon="key" />
    </View>
  );
};

export default KeyToggle;

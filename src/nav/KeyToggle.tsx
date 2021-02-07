import React from "react";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { toggleKeyModal } from "../store/experience/experienceReducer";

const KeyToggle: React.FC = () => {
  const dispatch = useDispatch();
  const onPress = () => dispatch(toggleKeyModal(true));
  return <IconButton onPress={onPress} icon="key" />;
};

export default KeyToggle;

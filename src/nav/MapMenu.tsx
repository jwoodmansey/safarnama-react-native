import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import { toggleKeyModal } from "../store/experience/experienceReducer";

const MapMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const dispatch = useDispatch();
  const onPress = () => {
    closeMenu();
    dispatch(toggleKeyModal(true));
  };

  const nav = useNavigation();
  const onPressList = () => {
    closeMenu();
    nav.navigate("PlaceListScreen");
  };

  const [t] = useTranslation();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton onPress={openMenu} icon="format-list-bulleted-triangle" />
      }
    >
      <Menu.Item onPress={onPressList} title={t("place:allPlaces")} />
      <Menu.Item onPress={onPress} title={t("place:mapKey")} />
    </Menu>
  );
};

export default MapMenu;

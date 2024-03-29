import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Caption, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { toggleKeyModal } from "../../../store/experience/experienceReducer";
import {
  selectExperienceHasRoutes,
  selectKeyModal,
} from "../../../store/experience/experienceSelectors";
import PlaceIcon from "./PlaceIcon";

const KeyModal: React.FC = () => {
  const [t] = useTranslation(["route"]);
  const data = useSelector(selectKeyModal);
  const experienceHasRoutes = useSelector(selectExperienceHasRoutes);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const onHide = () => dispatch(toggleKeyModal(false));
  return (
    <Modal
      style={styles.modal}
      hasBackdrop
      isVisible={data.isVisible}
      swipeDirection="down"
      onDismiss={onHide}
      onSwipeComplete={onHide}
      onBackdropPress={onHide}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        {data.keys.map((key) => (
          <View key={key.name} style={styles.keyItemContainer}>
            <PlaceIcon placeType={key} />
            <Caption style={styles.title}>{key.name}</Caption>
          </View>
        ))}
        {experienceHasRoutes && (
          <>
            <View style={styles.keyItemContainer}>
              <PlaceIcon placeType={{ matIcon: "outlined_flag" }} />
              <Caption style={styles.title}>{t("route:routeStart")}</Caption>
            </View>
            <View style={styles.keyItemContainer}>
              <PlaceIcon placeType={{ matIcon: "flag" }} />
              <Caption style={styles.title}>{t("route:routeEnd")}</Caption>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
  },
  keyItemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  title: {
    maxWidth: 100,
    textAlign: "center",
  },
});

export default KeyModal;

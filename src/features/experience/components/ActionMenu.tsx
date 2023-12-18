import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { toggleKeyModal } from "../../../store/experience/experienceReducer";
import { MapNaviationProp } from "../../../types/nav/root";

type Props = {
  onPressCentre: () => void;
  isRegionVisible: boolean;
  isCentred: boolean;
};

const ActionMenu: React.FC<Props> = ({
  onPressCentre,
  isRegionVisible,
  isCentred,
}) => {
  const [fabOpen, setFabOpen] = useState(false);
  const onStateChange = ({ open }: { open: boolean }) => setFabOpen(open);

  const dispatch = useDispatch();
  const onPressKey = () => {
    setFabOpen(false);
    dispatch(toggleKeyModal(true));
  };

  const nav = useNavigation<StackNavigationProp<MapNaviationProp>>();
  const onPressList = () => {
    setFabOpen(false);
    nav.navigate("PlaceListScreen");
  };

  const [t] = useTranslation();
  const { bottom } = useSafeAreaInsets();

  return (
    <FAB.Group
      icon={isRegionVisible ? "map" : "map-outline"}
      open={fabOpen}
      visible
      actions={[
        {
          icon: "map-legend",
          label: t("place:mapKey"),
          onPress: onPressKey,
        },
        ...(isCentred
          ? []
          : [
              {
                icon: "backup-restore",
                label: "Centre experience",
                onPress: onPressCentre,
                small: isRegionVisible,
              },
            ]),
        {
          icon: "map-marker-multiple",
          label: "All places",
          onPress: onPressList,
          small: false,
        },
      ]}
      color="black"
      fabStyle={[styles.fab, { marginBottom: bottom || 20 }]}
      onStateChange={onStateChange}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "white",
  },
});

export default ActionMenu;

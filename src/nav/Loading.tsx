import React from "react";
import { useTranslation } from "react-i18next";
import SpinnerOverlay from "react-native-loading-spinner-overlay";
import { Colors, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../store/loading/loadingSelectors";

const Loading: React.FC = () => {
  const isVisible = useSelector(selectIsLoading);
  const { colors } = useTheme();
  const [t] = useTranslation("loading");
  return (
    <SpinnerOverlay
      overlayColor={colors.backdrop}
      textContent={t("justASec")}
      textStyle={{ color: Colors.white }}
      visible={isVisible}
    />
  );
};

export default Loading;

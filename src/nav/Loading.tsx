import React from "react";
import SpinnerOverlay from "react-native-loading-spinner-overlay";
import { Colors, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

const Loading: React.FC = () => {
  const isVisible = useSelector<RootState, boolean>(
    (state) => state.experience.isDownloading === true
  );
  const { colors } = useTheme();
  return (
    <SpinnerOverlay
      overlayColor={colors.backdrop}
      textContent="Just a sec..."
      textStyle={{ color: Colors.white }}
      visible={isVisible}
    />
  );
};

export default Loading;

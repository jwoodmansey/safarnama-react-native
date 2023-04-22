import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import SpinnerOverlay from "react-native-loading-spinner-overlay";
import {
  Card,
  Colors,
  ProgressBar,
  Subheading,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectDownloadingMedia } from "../store/experience/experienceSelectors";
import { RootState } from "../store/rootReducer";

const Loading: React.FC = () => {
  const downloading = useSelector(selectDownloadingMedia);
  const isVisible = useSelector<RootState, boolean>(
    (state) => state.loading.isLoading === true
  );
  const { colors } = useTheme();
  const [t] = useTranslation("loading");
  const { bottom } = useSafeAreaInsets();

  if (!downloading) {
    return (
      <SpinnerOverlay
        overlayColor={colors.backdrop}
        textContent={t("justASec")}
        textStyle={{ color: Colors.white }}
        visible={isVisible}
      />
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <Card
      style={[
        styles.downloadingMediaCard,
        {
          paddingBottom: bottom,
        },
      ]}
    >
      <Subheading style={styles.downloadingMediaCardHeader}>
        {t("downloadingItems", {
          total: downloading?.total,
          downloaded: downloading?.downloaded,
        })}
      </Subheading>
      <View style={styles.downloadingMediaCardProgressBar}>
        <ProgressBar progress={downloading.downloaded / downloading.total} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  downloadingMediaCard: {
    padding: 15,
  },
  downloadingMediaCardHeader: {
    marginBottom: 10,
    textAlign: "center",
  },
  downloadingMediaCardProgressBar: {
    marginHorizontal: 20,
  },
});

export default Loading;

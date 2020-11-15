import React from "react";
import { StyleSheet } from "react-native";
import { Caption, Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  acknowledgements?: string;
};

const AcknowledgementsOverlay: React.FC<Props> = ({ acknowledgements }) => {
  if (!acknowledgements) return null;
  return (
    <SafeAreaView edges={["bottom"]} style={styles.acknowledgementsContainer}>
      <Caption style={styles.acknowledgements}>
        {acknowledgements?.replace("(c)", "©")}
      </Caption>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  acknowledgements: {
    color: Colors.white,
    padding: 16,
    fontStyle: "italic",
  },
  acknowledgementsContainer: {
    backgroundColor: "rgba(100, 100, 100, .5)",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default AcknowledgementsOverlay;

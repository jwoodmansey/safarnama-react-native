import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, MD2Colors, Text } from "react-native-paper";

type Props = { onPressRequestPermission: () => void };

const RequestPermissionView: React.FC<Props> = ({
  onPressRequestPermission,
}) => {
  return (
    <View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Safarnama needs permission to access your camera
        </Text>
        <Button mode="contained" onPress={onPressRequestPermission}>
          Continue
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instructionsContainer: {
    margin: 40,
    backgroundColor: MD2Colors.black,
    padding: 16,
    borderRadius: 8,
  },
  instructionsText: {
    textAlign: "center",
    color: MD2Colors.white,
    flexShrink: Platform.select({ ios: 1, android: 0 }),
    justifyContent: "center",
    marginBottom: 16,
  },
});

export default RequestPermissionView;

import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  onPress?: () => void;
  children: ReactNode;
  secondary?: boolean;
};

const PrimaryButton: React.FC<Props> = ({ onPress, children, secondary }) => {
  return (
    <Button
      mode={!secondary ? "contained" : "text"}
      style={styles.button}
      contentStyle={styles.buttonContent}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
  buttonContent: {
    width: "100%",
    height: 50,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});

export default PrimaryButton;

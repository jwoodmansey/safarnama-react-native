import React from "react";
import { StyleSheet, View } from "react-native";
import { Subheading, Title } from "react-native-paper";

type Props = {
  title: string;
  subheading: string;
};

const Header: React.FC<Props> = ({ title, subheading }) => {
  return (
    <View style={styles.container}>
      <Title style={styles.text}>{title}</Title>
      <Subheading style={styles.text}>{subheading}</Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: "center",
  },
});

export default Header;

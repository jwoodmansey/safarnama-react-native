import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Subheading, Title } from "react-native-paper";

type Props = {
  title: string;
  subheading: string;
};

const Header: React.FC<Props> = ({ title, subheading, children }) => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.text}>{title}</Title>
      <Subheading style={[styles.text, styles.subheading]}>
        {subheading}
      </Subheading>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  text: {
    textAlign: "center",
  },
  subheading: {
    fontSize: 14,
  },
});

export default Header;

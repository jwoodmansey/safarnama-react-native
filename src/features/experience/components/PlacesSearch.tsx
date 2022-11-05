import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

type Props = {
  onChangeText: (text: string) => void;
};

const PlacesSearch: React.VFC<Props> = ({ onChangeText }) => {
  const [searchText, setSearchText] = useState("");

  const change = (text: string) => {
    onChangeText(text);
    setSearchText(text);
  };

  return (
    <Searchbar style={styles.search} onChangeText={change} value={searchText} />
  );
};

const styles = StyleSheet.create({
  search: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default PlacesSearch;

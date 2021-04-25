import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  FlatList,
  Linking,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";

const LICENSES_FILE = require("../../../licenses.json");

export interface ILicense {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
}

interface IFinalLicense {
  name: string;
  version: string;
  licenseSpecs: ILicense;
}

const LicensesScreen: React.FC = () => {
  const [t] = useTranslation(["about"]);

  // LET'S GET THE LICENSES AND DEFINE OUR REGEXES
  const licenses: {
    [id: string]: ILicense;
  } = LICENSES_FILE;
  const numberRegex = /\d+(\.\d+)*/;
  const atRegex = /(?:@)/gi;

  const finalLicense: IFinalLicense[] = Object.keys(licenses).map((idx) => {
    const item = licenses[idx];
    // Extract the version of the library from the name
    const version = idx.match(numberRegex);
    // Removes the part after the @
    const nameWithoutVersion = idx
      .replace(atRegex, "")
      .replace(version ? version[0] : "", "");
    return {
      name: nameWithoutVersion,
      version: version ? version[0] : "",
      licenseSpecs: item,
    };
  });
  const onPressLicense = (l: IFinalLicense) => () =>
    Linking.openURL(l.licenseSpecs.licenseUrl);
  const onPressRepo = (l: IFinalLicense) => () =>
    Linking.openURL(l.licenseSpecs.repository);
  const renderItem: ListRenderItem<IFinalLicense> = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} subtitle={item.version} />
      <Card.Content>
        <Paragraph>{item.licenseSpecs.licenses}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {item.licenseSpecs.licenseUrl && (
          <Button title={t("about:license")} onPress={onPressLicense(item)} />
        )}
        {item.licenseSpecs.repository && (
          <Button title={t("about:repository")} onPress={onPressRepo(item)} />
        )}
      </Card.Actions>
    </Card>
  );
  const keyExtractor = (item: IFinalLicense) => item.name;

  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={finalLicense}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 20,
  },
  card: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
});

export default LicensesScreen;

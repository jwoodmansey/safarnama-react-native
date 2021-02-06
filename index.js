/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import { Constants } from "react-native-unimodules";

console.log(Constants.systemFonts);
enableScreens();

AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import { AppRegistry } from "react-native";
import { enableScreens } from "react-native-screens";
import { Constants } from "react-native-unimodules";
import App from "./App";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
// Before rendering any navigation stack

console.log(Constants.systemFonts);
enableScreens();

AppRegistry.registerComponent(appName, () => App);

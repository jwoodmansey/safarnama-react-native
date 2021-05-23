/**
 * @format
 */

import { AppRegistry } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Constants } from "react-native-unimodules";
import App from "./App";
import { name as appName } from "./app.json";
import { sendPlacePush } from "./src/utils/pushNotifications";

// Before rendering any navigation stack

console.log(Constants.systemFonts);
enableScreens();

const MyHeadlessTask = async (event) => {
  // Get task id from event {}:
  const { taskId } = event;
  const isTimeout = event.timeout; // <-- true when your background-time has expired.
  if (isTimeout) {
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing immediately finish(taskId)
    console.log("[BackgroundFetch] Headless TIMEOUT:", taskId);
    BackgroundFetch.finish(taskId);
    return;
  }
  console.log("[BackgroundFetch HeadlessTask] start: ", taskId);
  if (event.action === "ENTER") {
    sendPlacePush(event);
  }
  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
};
// BackgroundFetch.configure({})
// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);

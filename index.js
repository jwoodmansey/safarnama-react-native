/**
 * @format
 */

import { AppRegistry } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import BackgroundGeolocation from "react-native-background-geolocation";
import "react-native-gesture-handler";
import PushNotification from "react-native-push-notification";
import { enableScreens } from "react-native-screens";
import App from "./App";
import { name as appName } from "./app.json";
import { navigate } from "./src/nav/NavigationRef";
import { sendPlacePush } from "./src/utils/pushNotifications";

// Before rendering any navigation stack

enableScreens();

const HeadlessTask = async (event) => {
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
  console.log("[BackgroundFetch HeadlessTask] start: ", taskId, event);
  if (event.action === "ENTER") {
    sendPlacePush(event);
  }
  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
};

// const HeadlessTask = async (event) => {
//   const { params } = event;
//   console.log("[BackgroundGeolocation HeadlessTask] -", event.name, params);

//   switch (event.name) {
//     case "heartbeat":
//       // Use await for async tasks
//       const location = await getCurrentPosition();
//       console.log(
//         "[BackgroundGeolocation HeadlessTask] - getCurrentPosition:",
//         location
//       );
//       break;
//     default:
//       console.log("Other");
//   }
// };

// let getCurrentPosition = () => {
//   return new Promise((resolve) => {
//     BackgroundGeolocation.getCurrentPosition(
//       {
//         samples: 1,
//         persist: false,
//       },
//       (location) => {
//         resolve(location);
//       },
//       (error) => {
//         resolve(error);
//       }
//     );
//   });
// };

PushNotification.configure({
  requestPermissions: false,
  onNotification: (e) => {
    if (e.data.placeId) {
      navigate("ViewPlaceScreen", {
        placeId: e.data.placeId,
        name: e.data.name,
      });
    }
  },
});

AppRegistry.registerComponent(appName, () => App);

BackgroundGeolocation.registerHeadlessTask(HeadlessTask);

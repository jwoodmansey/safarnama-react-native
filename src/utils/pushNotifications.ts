import { GeofenceEvent } from "react-native-background-geolocation";
import notifee, { EventType } from "@notifee/react-native";
import { translateOutsideComponent } from "../i18n/config";
import { navigate } from "../nav/NavigationRef";

const CHANNEL_ID = "place";

export const createChannel = () => {
  notifee.createChannel({
    id: CHANNEL_ID,
    name: "Place of interest",
  });
};
export const sendPlacePush = (event: GeofenceEvent) => {
  console.log("Sending place push", event);
  // navigate("ViewPlaceScreen", {
  //   placeId: event.identifier,
  //   name: event.extras.name,
  // });

  notifee.displayNotification({
    // eslint-disable-next-line i18next/no-literal-string
    title: `📍 ${event.extras?.name}`,
    body: translateOutsideComponent("pushNotification:tapToLearnMore"),
    id: event.identifier,
    android: {
      channelId: CHANNEL_ID,
      smallIcon: "ic_stat_name",
    },
    data: {
      placeId: event.identifier,
      ...(event.extras?.name && typeof event.extras.name === "string"
        ? { name: event.extras.name }
        : {}),
    },
  });
};

export const requestPushPermission = async () => {
  return notifee.requestPermission({ alert: true, badge: true, sound: true });
};

export const listenForPushPressEvents = async () => {
  notifee.onForegroundEvent((event) => {
    if (event.type !== EventType.PRESS) {
      return;
    }
    const placeId = event.detail.notification?.data?.placeId;
    const name = event.detail.notification?.data?.name;
    if (placeId === undefined || typeof placeId !== "string") {
      return;
    }
    if (name !== undefined && typeof name !== "string") {
      return;
    }

    navigate("MapScreen", {
      screen: "ViewPlaceScreen",
      params: {
        placeId: placeId,
        name,
      },
    });
  });
};

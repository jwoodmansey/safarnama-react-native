import PushNotification from "react-native-push-notification";
import { translateOutsideComponent } from "../i18n/config";

const CHANNEL_ID = "place";

export const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: CHANNEL_ID,
      channelName: "Place of interest",
    },
    () => {}
  );
};

export const sendPlacePush = (event: any) => {
  PushNotification.localNotification({
    // eslint-disable-next-line i18next/no-literal-string
    title: `📍 ${event.extras?.name}`,
    smallIcon: "ic_stat_name",
    message: translateOutsideComponent("pushNotification:tapToLearnMore"),
    messageId: event.identifier,
    channelId: CHANNEL_ID,
    userInfo: {
      placeId: event.identifier,
      name: event.extras?.name,
    },
  });
};

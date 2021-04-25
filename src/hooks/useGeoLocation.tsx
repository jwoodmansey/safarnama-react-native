import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import BackgroundGeolocation from "react-native-background-geolocation";
import PushNotification from "react-native-push-notification";
import { navigate } from "../nav/NavigationRef";

const useGeoLocation = () => {
  const [t] = useTranslation("pushNotification");
  useEffect(() => {
    BackgroundGeolocation.ready(
      {
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        // Activity Recognition
        stopTimeout: 1,
        // Application config
        debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      },
      (state) => {
        console.log(
          "- BackgroundGeolocation is configured and ready: ",
          state.enabled
        );

        if (!state.enabled) {
          /// /
          // 3. Start tracking!
          //
          BackgroundGeolocation.startGeofences(() => {
            console.log("- Start success");
          });
        }
      }
    );
    BackgroundGeolocation.onGeofence((event) => {
      if (event.action === "ENTER") {
        PushNotification.localNotification({
          // eslint-disable-next-line i18next/no-literal-string
          title: `📍 ${event.extras?.name}`,
          message: t("tapToLearnMore"),
          messageId: event.identifier,
          userInfo: {
            placeId: event.identifier,
            name: event.extras?.name,
          },
        });
      }
    });

    PushNotification.configure({
      onNotification: (e) => {
        if (e.data.placeId) {
          navigate("ViewPlaceScreen", {
            placeId: e.data.placeId,
            name: e.data.name,
          });
        }
      },
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, [t]);
};

export default useGeoLocation;

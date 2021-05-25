import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import BackgroundGeolocation from "react-native-background-geolocation";
import PushNotification from "react-native-push-notification";
import { useSelector } from "react-redux";
import { navigate } from "../nav/NavigationRef";
import { selectIsOnboardingComplete } from "../store/onboarding/onboardingSelectors";
import { createChannel, sendPlacePush } from "../utils/pushNotifications";

const useGeoLocation = () => {
  const [t] = useTranslation("pushNotification");

  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);

  useEffect(() => {
    BackgroundGeolocation.ready(
      {
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        // Activity Recognition
        foregroundService: true,
        stopTimeout: 1,
        // Application config
        enableHeadless: true,
        geofenceModeHighAccuracy: true,
        geofenceInitialTriggerEntry: true,
        notification: {
          channelName: "Something",
          smallIcon: "drawable/ic_stat_name",
        },
        debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
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
          if (isOnboardingComplete) {
            BackgroundGeolocation.startGeofences(() => {
              console.log("- Start success");
            });
          }
        }
      }
    );
    createChannel();
    BackgroundGeolocation.onGeofence((event) => {
      if (event.action === "ENTER" || event.action === "DWELL") {
        sendPlacePush(event);
      }
    });

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

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, [t, isOnboardingComplete]);
};

export default useGeoLocation;

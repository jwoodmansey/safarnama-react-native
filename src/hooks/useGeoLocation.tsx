import { useEffect } from "react";
import BackgroundGeolocation from "react-native-background-geolocation";
import PushNotification from "react-native-push-notification";

const useGeoLocation = () => {
  useEffect(() => {
    BackgroundGeolocation.ready(
      {
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        // Activity Recognition
        stopTimeout: 1,
        // Application config
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
          BackgroundGeolocation.startGeofences(() => {
            console.log("- Start success");
          });
        }
      }
    );
    BackgroundGeolocation.onGeofence((event) => {
      if (event.action === "ENTER") {
        PushNotification.localNotification({
          title: "Place",
          message: "Place geofence",
        });
      }
    });
    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);
};

export default useGeoLocation;

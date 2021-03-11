import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import BackgroundGeolocation from "react-native-background-geolocation";
import { Banner } from "react-native-paper";
import { check, checkMultiple } from "react-native-permissions";

const PermissionBanner: React.FC = () => {
  const [state, setState] = useState<
    "unavailable" | "blocked" | "denied" | "granted" | "limited" | null
  >();
  useEffect(() => {
    async function checkPerms() {
      const always = await checkMultiple([
        "ios.permission.LOCATION_WHEN_IN_USE",
        "ios.permission.LOCATION_ALWAYS",
      ]);
      Alert.alert(JSON.stringify(always));
      //   setState(always);
    }
    checkPerms();
  }, []);

  return (
    <Banner
      actions={[
        {
          label: "Dismiss",
          onPress: () => setState(null),
        },
        {
          label: "Enable",
          onPress: () => BackgroundGeolocation.requestPermission(),
        },
      ]}
      visible={state !== undefined && state !== null && state !== "granted"}
    >
      We don&apos;t have permission to access your location.{state}
    </Banner>
  );
};

export default PermissionBanner;

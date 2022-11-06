import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import BackgroundGeolocation, {
  AuthorizationStatus,
} from "react-native-background-geolocation";
import { Banner } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { skippedPermissionsBanner } from "../store/settings/settingsReducer";

const LocationPermissionsBanner: React.VFC = () => {
  const [authStatus, setAuthStatus] = useState<AuthorizationStatus>(0);

  const dispatch = useDispatch();
  const hidePermissionsBanner = useSelector<RootState>(
    (state) => state.settings.hidePermissionsBanner
  );

  useEffect(() => {
    BackgroundGeolocation.getProviderState().then((state) => {
      setAuthStatus(state.status);
    });

    BackgroundGeolocation.onProviderChange((event) => {
      setAuthStatus(event.status);
    });
  }, []);

  const [t] = useTranslation(["glossary", "manage"]);
  return (
    <Banner
      visible={(authStatus === 1 || authStatus === 2) && !hidePermissionsBanner}
      icon="map-marker-alert-outline"
      actions={[
        {
          label: t("glossary:fix"),
          onPress: () => Linking.openSettings(),
        },
        {
          label: t("glossary:skip"),
          onPress: () => dispatch(skippedPermissionsBanner()),
        },
      ]}
    >
      {t("manage:locationPermissionMissing")}
    </Banner>
  );
};

export default LocationPermissionsBanner;

import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from "@react-native-firebase/dynamic-links";
import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";
import { navigate } from "../nav/NavigationRef";

const useDeeplinking = () => {
  const [handledInitial, setHandledInitial] = useState(false);
  const handleDynamicLink = useCallback(
    (link: {
      dynamicLink: FirebaseDynamicLinksTypes.DynamicLink;
      foreground: boolean;
    }) => {
      if (link.foreground || !handledInitial) {
        setHandledInitial(true);
        const split = link.dynamicLink.url.split("/");
        if (split[split.length - 2] === "download") {
          navigate("ExperienceManagement", {
            screen: "ExperienceDetailsScreen",
            params: {
              experienceId: split[split.length - 1],
            },
          });
        }
      }
    },
    [handledInitial, setHandledInitial]
  );

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(
      (dynamicLink: FirebaseDynamicLinksTypes.DynamicLink) =>
        handleDynamicLink({ dynamicLink, foreground: true })
    );

    // Useful for testing
    // navigate("ExperienceManagement", {
    //   screen: "ExperienceDetailsScreen",
    //   params: {
    //     experienceId: "615dc184ae70ce8cdcaa60df",
    //   },
    // });

    return () => unsubscribe();
  }, [handleDynamicLink]);

  const handleNativeUrl = useCallback(
    (event: { url: string; utmParameters?: Record<string, string> }) => {
      handleDynamicLink({
        dynamicLink: {
          url: event.url,
          minimumAppVersion: null,
          utmParameters: event.utmParameters || {},
        },
        foreground: true,
      });
    },
    [handleDynamicLink]
  );
  useEffect(() => {
    Linking.addEventListener("url", handleNativeUrl);
    return () => Linking.removeEventListener("url", handleNativeUrl);
  }, [handleNativeUrl]);

  // Background links
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((dynamicLink) => {
        if (dynamicLink !== null) {
          handleDynamicLink({ dynamicLink, foreground: false });
        }
      });
    Linking.getInitialURL().then((url) => {
      if (url !== null) {
        handleDynamicLink({
          dynamicLink: { url, utmParameters: {}, minimumAppVersion: null },
          foreground: false,
        });
      }
    });
  }, [handleDynamicLink, handleNativeUrl]);
};

export default useDeeplinking;

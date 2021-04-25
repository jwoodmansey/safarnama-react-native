import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from "@react-native-firebase/dynamic-links";
import { useCallback, useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
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
          navigate("ExperienceDetailsScreen", {
            experienceId: split[split.length - 1],
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
    return () => unsubscribe();
  }, [handleDynamicLink]);

  const handleNativeUrl = useCallback(
    (event: { url: string }) => {
      handleDynamicLink({
        dynamicLink: { url: event.url, minimumAppVersion: null },
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
          dynamicLink: { url, minimumAppVersion: null },
          foreground: false,
        });
      }
    });
  }, [handleDynamicLink, handleNativeUrl]);
};

export default useDeeplinking;

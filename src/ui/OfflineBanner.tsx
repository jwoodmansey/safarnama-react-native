import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Banner } from "react-native-paper";
import useIsOnline from "../hooks/useIsOnline";

type Props = {
  title?: string;
};

const OfflineBanner: React.VFC<Props> = ({ title }) => {
  const isOnline = useIsOnline();
  const [hasDismissed, setHasDismissed] = useState(false);
  const [t] = useTranslation(["glossary", "manage"]);
  return (
    <Banner
      visible={isOnline !== null && !isOnline && !hasDismissed}
      icon="cloud-off-outline"
      actions={[
        {
          label: t("glossary:continue"),
          onPress: () => setHasDismissed(true),
        },
      ]}
    >
      {title || t("manage:youAreOffline")}
    </Banner>
  );
};

export default OfflineBanner;

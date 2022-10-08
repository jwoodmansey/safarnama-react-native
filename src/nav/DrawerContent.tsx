import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { useTranslation } from "react-i18next";
import { Drawer } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedExperience } from "../store/experience/experienceReducer";
import { selectMyExperiences } from "../store/experience/experienceSelectors";
import { navigate } from "./NavigationRef";

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const onPressViewCurrent = (id: string) => () => {
    dispatch(setSelectedExperience({ id }));
    navigate("MapScreen");
  };
  const onPressFeatured = () =>
    navigate("AddExperience", { screen: "FeaturedExperienceScreen" });
  const onPressManage = () =>
    navigate("ExperienceManagement", { screen: "ManageExperiencesScreen" });
  const onPressLicenses = () => navigate("Licenses");
  const onPressAbout = () => navigate("About");
  const onPressPrivacySettings = () => navigate("Privacy");
  const onPressLanguageSettings = () => navigate("Language");

  const experiences = useSelector(selectMyExperiences);
  const [t] = useTranslation(["glossary", "manage", "about", "settings"]);
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title={t("glossary:experience")}>
        {Object.values(experiences).map((e) => (
          <Drawer.Item
            key={e.data._id}
            icon={e.downloaded ? "map-check" : "map"}
            label={e.data.name}
            onPress={onPressViewCurrent(e.data._id)}
          />
        ))}
        <Drawer.Item
          icon="bookmark-multiple"
          onPress={onPressManage}
          label={t("glossary:manage")}
        />
        <Drawer.Item
          icon="download"
          onPress={onPressFeatured}
          label={t("manage:findMore")}
        />
      </Drawer.Section>
      <Drawer.Section title={t("settings:settings")}>
        <Drawer.Item
          icon="account-lock"
          label={t("settings:privacy.privacy")}
          onPress={onPressPrivacySettings}
        />
        <Drawer.Item
          icon="translate"
          label={t("settings:language.language")}
          onPress={onPressLanguageSettings}
        />
      </Drawer.Section>
      <Drawer.Section title={t("glossary:about")}>
        <Drawer.Item
          icon="information"
          label={t("glossary:about")}
          onPress={onPressAbout}
        />
        <Drawer.Item
          icon="receipt"
          label={t("about:thirdPartyLicenses")}
          onPress={onPressLicenses}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

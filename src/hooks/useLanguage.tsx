import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { LanguageSetting } from "../store/settings/settingsReducer";

const useLanguage = () => {
  const selectedLanguage = useSelector<RootState, LanguageSetting>(
    (s) => s.settings.lng
  );
  const [, i18n] = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);
};

export default useLanguage;

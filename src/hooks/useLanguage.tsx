import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectLanguage } from "../store/settings/settingsSelector";

const useLanguage = () => {
  const selectedLanguage = useSelector(selectLanguage);
  const [, i18n] = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);
};

export default useLanguage;

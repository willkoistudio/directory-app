import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TRANSLATION_EN from "./lang/en-US";
import TRANSLATION_FR from "./lang/fr-FR";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: TRANSLATION_EN,
    },
    fr: {
      translation: TRANSLATION_FR,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

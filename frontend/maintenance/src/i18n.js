import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_HU } from "./locales/hu/translation";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      hu: {
        translation: TRANSLATIONS_HU,
      },
    },
  });

i18n.changeLanguage("hu");

import { hu, enGB } from "date-fns/locale";

export type SupportedLanguanges = "hu" | "en";

export type LocaleOptions = {
  longDateFormat: string;
  phoneFormat: string;
  phonePlaceholder: string;
  tinyMCEDates: string[];
  tinyMCELang: string;
  phonePattern: RegExp;
};
const supportedLocales: { [key: string]: Locale } = { hu: hu, en: enGB };

export const locales: {
  [key in SupportedLanguanges]: LocaleOptions;
} = {
  hu: {
    longDateFormat: "yyyy. MMMM. dd.",
    phoneFormat: "+36 (00) 000-0000",
    phonePlaceholder: "+36 (30) 123-4567",
    phonePattern: /(\+)(\d{2})(\d{2})(\d{3})(\d{4})/,
    tinyMCEDates: ["%H:%M:%S", "%Y. %m. %d.", "%Y. %a. %d. %H:%M:%S"],
    tinyMCELang: "hu_HU",
  },
  en: {
    longDateFormat: "dd-MMMM-yyyy",
    phoneFormat: "",
    phonePlaceholder: "",
    phonePattern: /(\+)(\d{2})(\d{2})(\d{3})(\d{4})/,
    tinyMCEDates: ["%H:%M:%S", "%Y-%m-%d", "%I:%M:%S %p"],
    tinyMCELang: "en_GB",
  },
};

export default supportedLocales;

import { Language } from "../../models/language";

export const IS_API_MOCKED = import.meta.env.VITE_REACT_APP_MOCKED === "true";

export const LANGUAGES_APP: Language[] = [
  {
    name: "English",
    abbreviation: "en",
    code: "en-US",
  },
  {
    name: "Français",
    abbreviation: "fr",
    code: "fr-FR",
  },
];

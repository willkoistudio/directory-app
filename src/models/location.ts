export interface CSC_Country {
  id: number; // The ID of the country.
  name: string; // The name of the country.
  iso3: string; // The ISO3 code of the country.
  iso2: string; // The ISO2 code of the country.
  phonecode: string; // The phone code of the country.
  capital: string; // The capital city of the country.
  currency: string; // The currency of the country.
  native: string; // The native name of the country.
  emoji: string; // The emoji representation of the country's flag.
  emojiU: string; // The Unicode representation of the country's flag.
}

export interface CSC_State {
  id: number; // The ID of the state.
  name: string; // The name of the state.
  iso2: string; // The ISO2 code of the state.
}

export interface CSC_City {
  id: number; // The ID of the city.
  name: string; // The name of the city.
}

export const COUNTRIES_MOCKS: CSC_Country[] = [
  {
    id: 1,
    name: "France",
    iso3: "FRA",
    iso2: "FR",
    phonecode: "+33",
    capital: "Paris",
    currency: "Euro",
    native: "Français",
    emoji: "🇫🇷",
    emojiU: "U+1F1EB U+1F1F7",
  },
  {
    id: 2,
    name: "United States",
    iso3: "USA",
    iso2: "US",
    phonecode: "+1",
    capital: "Washington, D.C.",
    currency: "US Dollar",
    native: "English",
    emoji: "🇺🇸",
    emojiU: "U+1F1FA U+1F1F8",
  },
  {
    id: 3,
    name: "Japan",
    iso3: "JPN",
    iso2: "JP",
    phonecode: "+81",
    capital: "Tokyo",
    currency: "Yen",
    native: "日本語",
    emoji: "🇯🇵",
    emojiU: "U+1F1EF U+1F1F5",
  },
];

export const STATES_MOCKS: CSC_State[] = [
  {
    id: 1,
    name: "Île-de-France",
    iso2: "IDF",
  },
  {
    id: 2,
    name: "California",
    iso2: "CA",
  },
  {
    id: 3,
    name: "Tokyo",
    iso2: "TK",
  },
];

export const CITIES_MOCKS: CSC_City[] = [
  {
    id: 1,
    name: "Paris",
  },
  {
    id: 2,
    name: "Los Angeles",
  },
  {
    id: 3,
    name: "Tokyo",
  },
];

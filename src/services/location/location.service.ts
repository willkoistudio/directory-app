import { CSC_City, CSC_Country, CSC_State } from "../../models/location";
export interface ServiceLocation {
  getCities: (countryCode: string, stateCode: string) => Promise<CSC_City[]>;
  getStates: (countryCode: string) => Promise<CSC_State[]>;
  getCountries: () => Promise<CSC_Country[]>;
}

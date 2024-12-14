import axios from "axios";
import { CSC_City, CSC_Country, CSC_State } from "../../models/location";
import { ServiceLocation } from "./location.service";

const countryStateCityAxiosConfig = {
  headers: {
    "X-CSCAPI-KEY": "Y0hBQjhVZ0FURUNsUmF6T3lkTWxha0tyVE1tV3pMY05YRFhnT1hEWg==",
  },
};

export class ServiceLocationHttp implements ServiceLocation {
  public async getCountries(): Promise<CSC_Country[]> {
    try {
      const { data } = await axios.get<CSC_Country[]>(
        "https://api.countrystatecity.in/v1/countries",
        countryStateCityAxiosConfig
      );
      return data;
    } catch (erreur) {
      throw new Error("Error fetching countries");
    }
  }

  public async getStates(countryCode: string): Promise<CSC_State[]> {
    try {
      const { data } = await axios.get<CSC_State[]>(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        countryStateCityAxiosConfig
      );
      return data;
    } catch (erreur) {
      throw new Error("Error fetching states");
    }
  }

  public async getCities(
    countryCode: string,
    stateCode: string
  ): Promise<CSC_City[]> {
    try {
      const { data } = await axios.get<CSC_City[]>(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
        countryStateCityAxiosConfig
      );
      return data;
    } catch (erreur) {
      throw new Error("Error fetching cities");
    }
  }
}

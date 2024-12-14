import {
  CITIES_MOCKS,
  COUNTRIES_MOCKS,
  CSC_City,
  CSC_Country,
  CSC_State,
  STATES_MOCKS,
} from "../../models/location";
import { ServiceLocation } from "./location.service";

export class ServiceLocationMock implements ServiceLocation {
  public constructor(
    private countries: CSC_Country[] = COUNTRIES_MOCKS,
    private states: CSC_State[] = STATES_MOCKS,
    private cities: CSC_City[] = CITIES_MOCKS,
    private latence = 1000
  ) {}

  public async getCountries(): Promise<CSC_Country[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.countries), this.latence)
    );
  }

  public async getStates(_countryCode: string): Promise<CSC_State[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.states), this.latence)
    );
  }

  public async getCities(
    _countryCode: string,
    _stateCode: string
  ): Promise<CSC_City[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.cities), this.latence)
    );
  }
}

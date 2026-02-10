import { createContext, useContext, useState } from "react";
import { ServiceLocationHttp } from "../services/location/location.service.http";
import { CSC_Country, CSC_State, CSC_City } from "../models/location";

interface CountryStateCityContext {
  countries: CSC_Country[];
  states: CSC_State[];
  cities: CSC_City[];
  fetchCountries: () => Promise<CSC_Country[]>;
  selectCountry: (countryCode: string) => Promise<CSC_State[]>;
  getStates: (countryCode?: string) => Promise<void>;
  getCities: (stateCode: string, countryCode?: string) => Promise<CSC_City[]>;
  loadingLocations: boolean;
}

const CscContext = createContext<CountryStateCityContext>({
  countries: [],
  states: [],
  cities: [],
  fetchCountries: () => Promise.resolve([]),
  selectCountry: () => Promise.resolve([]),
  getStates: () => Promise.resolve(),
  getCities: () => Promise.resolve([]),
  loadingLocations: false,
});

export const CscProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const serviceLocation = new ServiceLocationHttp();
  const [countries, setCountries] = useState<CSC_Country[]>([]);
  const [states, setStates] = useState<CSC_State[]>([]);
  const [cities, setCities] = useState<CSC_City[]>([]);
  const [loadingLocations, setLoadingLocations] = useState<boolean>(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const fetchCountries = async () => {
    setLoadingLocations(true);
    const data = await serviceLocation.getCountries();
    setCountries(data);
    setLoadingLocations(false);
    return data;
  };

  const selectCountry = async (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setStates([]);
    setCities([]);
    // Fetch states immediately
    setLoadingLocations(true);
    try {
      const data = await serviceLocation.getStates(countryCode);
      setStates(data);
      return data;
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    } finally {
      setLoadingLocations(false);
    }
  };

  const getStates = async (countryCode?: string) => {
    const code = countryCode || selectedCountryCode;
    if (!code) {
      return;
    }
    setLoadingLocations(true);
    const data = await serviceLocation.getStates(code);
    setLoadingLocations(false);
    setStates(data);
  };

  const getCities = async (stateCode: string, countryCode?: string) => {
    const country = countryCode || selectedCountryCode;
    if (!country) {
      return [];
    }
    setLoadingLocations(true);
    const data = await serviceLocation.getCities(
      country,
      stateCode
    );
    setLoadingLocations(false);
    setCities(data);
    return data;
  };

  return (
    <CscContext.Provider
      value={{
        countries,
        states,
        cities,
        fetchCountries,
        selectCountry,
        getStates,
        getCities,
        loadingLocations,
      }}
    >
      {children}
    </CscContext.Provider>
  );
};

export const useCountryStateCity = () => {
  const context = useContext(CscContext);
  if (!context) {
    throw new Error("useCsc must be used within a CscProvider");
  }
  return context;
};

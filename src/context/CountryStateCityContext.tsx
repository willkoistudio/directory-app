import { createContext, useContext, useState } from "react";
import { ServiceLocationHttp } from "../services/location/location.service.http";
import { CSC_Country, CSC_State, CSC_City } from "../models/location";

interface CountryStateCityContext {
  countries: CSC_Country[];
  states: CSC_State[];
  cities: CSC_City[];
  fetchCountries: () => Promise<void>;
  selectCountry: (countryCode: string) => void;
  getStates: () => Promise<void>;
  getCities: (stateCode: string) => Promise<void>;
  loadingLocations: boolean;
}

const CscContext = createContext<CountryStateCityContext>({
  countries: [],
  states: [],
  cities: [],
  fetchCountries: () => Promise.resolve(),
  selectCountry: () => {},
  getStates: () => Promise.resolve(),
  getCities: () => Promise.resolve(),
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
  };

  const selectCountry = async (countryCode: string) => {
    setLoadingLocations(true);
    setSelectedCountryCode(countryCode);
    setStates([]);
    setCities([]);
    await getStates();
    setLoadingLocations(false);
  };

  const getStates = async () => {
    if (!selectedCountryCode) {
      throw new Error("A country must be selected before fetching states.");
    }
    setLoadingLocations(true);
    const data = await serviceLocation.getStates(selectedCountryCode);
    setStates(data);
    setLoadingLocations(false);
  };

  const getCities = async (stateCode: string) => {
    if (!selectedCountryCode) {
      throw new Error("A country must be selected before fetching cities.");
    }
    setLoadingLocations(true);
    const data = await serviceLocation.getCities(
      selectedCountryCode,
      stateCode
    );
    setCities(data);
    setLoadingLocations(false);
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

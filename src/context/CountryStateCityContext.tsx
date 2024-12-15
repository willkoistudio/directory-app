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
}

const CscContext = createContext<CountryStateCityContext>({
  countries: [],
  states: [],
  cities: [],
  fetchCountries: () => Promise.resolve(),
  selectCountry: () => {},
  getStates: () => Promise.resolve(),
  getCities: () => Promise.resolve(),
});

export const CscProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const serviceLocation = new ServiceLocationHttp();
  const [countries, setCountries] = useState<CSC_Country[]>([]);
  const [states, setStates] = useState<CSC_State[]>([]);
  const [cities, setCities] = useState<CSC_City[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const fetchCountries = async () => {
    const data = await serviceLocation.getCountries();
    setCountries(data);
  };

  const selectCountry = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setStates([]);
    setCities([]);
  };

  const getStates = async () => {
    if (!selectedCountryCode) {
      throw new Error("A country must be selected before fetching states.");
    }
    const data = await serviceLocation.getStates(selectedCountryCode);
    setStates(data);
  };

  const getCities = async (stateCode: string) => {
    if (!selectedCountryCode) {
      throw new Error("A country must be selected before fetching cities.");
    }
    const data = await serviceLocation.getCities(
      selectedCountryCode,
      stateCode
    );
    setCities(data);
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

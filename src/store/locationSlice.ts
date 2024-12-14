import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CSC_City, CSC_Country, CSC_State } from "../models/location";
import { ServiceLocationHttp } from "../services/location/location.service.http";
import { ServiceLocationMock } from "../services/location/location.service.mock";
import { IS_API_MOCKED } from "../helpers/const/common";

const serviceLocation = IS_API_MOCKED
  ? new ServiceLocationMock()
  : new ServiceLocationHttp();

export const getCountries = createAsyncThunk(
  "location/getCountries",
  async () => {
    return await serviceLocation.getCountries();
  }
);

export const getStates = createAsyncThunk(
  "location/getStates",
  async (countryCode: string) => {
    return await serviceLocation.getStates(countryCode);
  }
);

export const getCities = createAsyncThunk(
  "location/getCities",
  async ({
    countryCode,
    stateCode,
  }: {
    countryCode: string;
    stateCode: string;
  }) => {
    return await serviceLocation.getCities(countryCode, stateCode);
  }
);

interface LocationState {
  countries: CSC_Country[];
  states: CSC_State[];
  cities: CSC_City[];
}

const initialState: LocationState = {
  countries: [],
  states: [],
  cities: [],
};

const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    });

    builder.addCase(getStates.fulfilled, (state, action) => {
      state.states = action.payload;
    });

    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = action.payload;
    });
  },
});

export default LocationSlice.reducer;

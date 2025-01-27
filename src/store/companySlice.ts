import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Company, CompanyData } from "../models/company";
import { ServiceCompanyHttp } from "../services/company/company.service.http";
import { ServiceCompanyMock } from "../services/company/company.service.mock";
import { IS_API_MOCKED } from "../const/common";

const serviceCompany = IS_API_MOCKED
  ? new ServiceCompanyMock()
  : new ServiceCompanyHttp();

export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async () => {
    return await serviceCompany.getCompanies();
  }
);

export const getCompanyDetail = createAsyncThunk(
  "companies/getCompanyDetail",
  async (id: string) => {
    return await serviceCompany.getCompanyDetail(id);
  }
);

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (company: CompanyData) => {
    return await serviceCompany.addCompany(company);
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (company: Company) => {
    return await serviceCompany.updateCompany(company);
  }
);

export const removeCompany = createAsyncThunk(
  "companies/removeCompany",
  async (id: string) => {
    return await serviceCompany.removeCompany(id);
  }
);

interface CompanyState {
  companies: Company[];
  companyDetail: CompanyData | null;
}

const initialState: CompanyState = {
  companies: [],
  companyDetail: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });
    builder.addCase(getCompanyDetail.fulfilled, (state, action) => {
      state.companyDetail = action.payload;
    });
  },
});

export default companySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../models/company";

interface CompanyState {
  companies: Company[];
}

const initialState: CompanyState = {
  companies: [],
};

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompany(state, action: PayloadAction<Company>) {
      state.companies.push(action.payload);
    },
    updateCompany(state, action: PayloadAction<Company>) {
      const companyToUpdate = state.companies.findIndex(
        (Company) => Company.id === action.payload.id
      );
      if (companyToUpdate !== -1) {
        state.companies[companyToUpdate] = action.payload;
      }
    },
    removeCompany(state, action: PayloadAction<string>) {
      state.companies = state.companies.filter(
        (Company) => Company.id !== action.payload
      );
    },
  },
});

// Export des actions
export const { addCompany, removeCompany } = companySlice.actions;

// Export du réducteur
export default companySlice.reducer;

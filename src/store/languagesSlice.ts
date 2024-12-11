import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../models/language";

interface CompanyState {
  languages: Language[];
}

const initialState: CompanyState = {
  languages: [],
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
});

// Export des actions
export const {} = languageSlice.actions;

// Export du réducteur
export default languageSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice";
import companyReducer from "./companySlice";
import contactReducer from "./contactSlice";
import locationReducer from "./locationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    contact: contactReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

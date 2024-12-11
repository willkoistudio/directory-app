import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../models/notification";

interface CompanyState {
  notifications: Notification[];
}

const initialState: CompanyState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (Notification) => Notification.id !== action.payload
      );
    },
  },
});

// Export des actions
export const { addNotification, removeNotification } =
  notificationSlice.actions;

// Export du réducteur
export default notificationSlice.reducer;

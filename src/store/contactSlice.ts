import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../models/contact";
import { ServiceContactHttp } from "../services/contact/contact.service.http";
import { ServiceContactMock } from "../services/contact/contact.service.mock";
import { IS_API_MOCKED } from "../helpers/const/common";

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const serviceContact: ServiceContactHttp | ServiceContactMock = IS_API_MOCKED
  ? new ServiceContactMock()
  : new ServiceContactHttp();

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    async getContacts(state) {
      state.contacts = await serviceContact.getContacts();
    },

    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const contactToUpdate = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (contactToUpdate !== -1) {
        state.contacts[contactToUpdate] = action.payload;
      }
    },
    removeContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

// Export des actions
export const { addContact, removeContact } = contactSlice.actions;

// Export du réducteur
export default contactSlice.reducer;

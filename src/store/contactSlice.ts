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

    async addContact(state, action: PayloadAction<Contact>) {
      return serviceContact.addContact(action.payload);
    },
    async updateContact(state, action: PayloadAction<Contact>) {
      return serviceContact.updateContact(action.payload);
    },
    async removeContact(state, action: PayloadAction<string>) {
      return serviceContact.removeContact(action.payload);
    },
  },
});

// Export des actions
export const { addContact, removeContact } = contactSlice.actions;

// Export du réducteur
export default contactSlice.reducer;

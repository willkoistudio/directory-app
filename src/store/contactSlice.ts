import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Contact } from "../models/contact";
import { ServiceContactHttp } from "../services/contact/contact.service.http";
import { ServiceContactMock } from "../services/contact/contact.service.mock";
import { IS_API_MOCKED } from "../helpers/const/common";

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [] as Contact[],
};

const serviceContact: ServiceContactHttp | ServiceContactMock = IS_API_MOCKED
  ? new ServiceContactMock()
  : new ServiceContactHttp();

export const getContacts = createAsyncThunk<Contact[], void>(
  "contacts/getContacts",
  async () => {
    return await serviceContact.getContacts();
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact: Contact) => {
    return await serviceContact.addContact(contact);
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact: Contact) => {
    return await serviceContact.updateContact(contact);
  }
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (id: string) => {
    return await serviceContact.removeContact(id);
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
  },
});

export default contactSlice.reducer;

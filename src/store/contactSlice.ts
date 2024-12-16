import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Contact, ContactData } from "../models/contact";
import { ServiceContactHttp } from "../services/contact/contact.service.http";
import { ServiceContactMock } from "../services/contact/contact.service.mock";
import { IS_API_MOCKED } from "../const/common";

interface ContactState {
  contacts: Contact[];
  contactDetail: ContactData | null;
}

const initialState: ContactState = {
  contacts: [] as Contact[],
  contactDetail: null,
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

export const getContactDetail = createAsyncThunk(
  "contacts/getContactDetail",
  async (id: string) => {
    return await serviceContact.getContactDetail(id);
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact: ContactData) => {
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
  async (id: string | string[]) => {
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

    builder.addCase(getContactDetail.fulfilled, (state, action) => {
      state.contactDetail = action.payload;
    });
  },
});

export default contactSlice.reducer;

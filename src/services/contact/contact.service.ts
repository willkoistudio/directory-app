import { Contact } from "../../models/contact";

export interface ServiceContact {
  getContacts: () => Promise<Contact[]>;
  getContactDetail: (id: string) => Promise<Contact>;
  addContact: (contact: Contact) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
}

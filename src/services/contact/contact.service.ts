import { Contact } from "../../models/contact";

export interface ServiceContact {
  getContacts: () => Promise<Contact[]>;
  addContact: (contact: Contact) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
}

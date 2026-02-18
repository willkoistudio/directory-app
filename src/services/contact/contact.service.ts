import { Contact, ContactData } from "../../models/Contact";

export interface ServiceContact {
  getContacts: () => Promise<Contact[]>;
  getContactDetail: (id: string) => Promise<ContactData>;
  addContact: (contact: ContactData) => Promise<ContactData>;
  updateContact: (contact: Contact) => Promise<void>;
  removeContact: (id: string | string[]) => Promise<void>;
}

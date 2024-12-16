import { Contact, ContactData } from "../../models/contact";

export interface ServiceContact {
  getContacts: () => Promise<Contact[]>;
  getContactDetail: (id: string) => Promise<ContactData>;
  addContact: (contact: ContactData) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  removeContact: (id: string | string[]) => Promise<void>;
}

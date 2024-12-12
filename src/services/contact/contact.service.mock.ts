import { Contact, CONTACT_MOCKS } from "../../models/contact";
import { ServiceContact } from "./contact.service";

export class ServiceContactMock implements ServiceContact {
  public constructor(
    private contacts: Contact[] = CONTACT_MOCKS,
    private latence = 1000
  ) {}

  public async getContacts(): Promise<Contact[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.contacts), this.latence)
    );
  }

  public async addContact(contact: Contact): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.contacts.push(contact);
        resolve();
      }, this.latence)
    );
  }

  public async updateContact(contact: Contact): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.contacts = this.contacts.map((c) =>
          c.id === contact.id ? contact : c
        );
        resolve();
      }, this.latence)
    );
  }

  public async removeContact(id: string): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.contacts = this.contacts.filter((c) => c.id !== id);
        resolve();
      }, this.latence)
    );
  }
}

import axios from "axios";
import { ServiceContact } from "./contact.service";
import { Contact, ContactData } from "../../models/contact";

export class ServiceContactHttp implements ServiceContact {
  public async getContacts(): Promise<Contact[]> {
    try {
      const { data } = await axios.get<Contact[]>(`contacts`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching contacts");
    }
  }

  public async getContactDetail(id: string): Promise<ContactData> {
    try {
      const { data } = await axios.get<ContactData>(`contacts/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching contact");
    }
  }

  public async addContact(contact: ContactData): Promise<void> {
    try {
      const { data } = await axios.post<void>(`contacts`, contact);
      return data;
    } catch (erreur) {
      throw new Error("Error adding contact");
    }
  }

  public async updateContact(contact: Contact): Promise<void> {
    try {
      const { data } = await axios.put<void>(`contacts/${contact.id}`, contact);
      return data;
    } catch (erreur) {
      throw new Error("Error updating contact");
    }
  }

  public async removeContact(id: string | string[]): Promise<void> {
    const ids = Array.isArray(id) ? id.join(",") : id;
    try {
      const { data } = await axios.delete<void>(`contacts/${ids}`);
      return data;
    } catch (erreur) {
      throw new Error("Error removing contact");
    }
  }
}

import axios from "axios";
import { ServiceContact } from "./contact.service";
import { Contact } from "../../models/contact";

export class ServiceContactHttp implements ServiceContact {
  public async getContacts(): Promise<Contact[]> {
    try {
      const { data } = await axios.get<Contact[]>(`contacts`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching contacts");
    }
  }

  public async getContactDetail(id: string): Promise<Contact> {
    try {
      const { data } = await axios.get<Contact>(`contacts/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching contact");
    }
  }

  public async addContact(contact: Contact): Promise<void> {
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

  public async removeContact(id: string): Promise<void> {
    try {
      const { data } = await axios.delete<void>(`contacts/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error removing contact");
    }
  }
}

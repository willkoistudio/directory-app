/** @format */

import apiClient from "../../lib/axios";
import { ServiceContact } from "./contact.service";
import { Contact, ContactData } from "../../models/Contact";

export class ServiceContactHttp implements ServiceContact {
  public async getContacts(): Promise<Contact[]> {
    try {
      const { data } = await apiClient.get<Contact[]>(`contacts`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching contacts");
    }
  }

  public async getContactDetail(id: string): Promise<ContactData> {
    try {
      const { data } = await apiClient.get<ContactData>(`contacts/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching contact");
    }
  }

  public async addContact(contact: ContactData): Promise<void> {
    try {
      const payload = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        workPhone: contact.workPhone,
        fax: contact.fax,
        function: contact.function,
        website: contact.website,
        companyId: contact.company?.id,
        address: contact.address,
        keywords: contact.keywords,
        avatar: contact.avatar,
        notes: contact.notes,
      };
      const { data } = await apiClient.post<void>(`contacts`, payload);
      return data;
    } catch (erreur) {
      throw new Error("Error adding contact");
    }
  }

  public async updateContact(contact: Contact): Promise<void> {
    try {
      const { data } = await apiClient.put<void>(
        `contacts/${contact.id}`,
        contact,
      );
      return data;
    } catch (erreur) {
      throw new Error("Error updating contact");
    }
  }

  public async removeContact(id: string | string[]): Promise<void> {
    const ids = Array.isArray(id) ? id.join(",") : id;
    try {
      const { data } = await apiClient.delete<void>(`contacts/batch/${ids}`);
      return data;
    } catch (erreur) {
      throw new Error("Error removing contact");
    }
  }
}

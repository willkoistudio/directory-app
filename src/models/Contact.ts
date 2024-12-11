import { Address } from "./address";

export interface Contact {
  id: string;
  name: string;
  companyId: string;
  email: string;
  phone: string;
  workPhone: string;
  fax?: string;
  notes?: string;
  function: string;
  website: string;
  address: Address;
  keywords: string[];
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

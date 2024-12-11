import { Address } from "./Address";

export interface Contact {
  id: string;
  name: string;
  companyId: string;
  status: "pending" | "processing" | "success" | "failed";
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
  updatedBy?: string;
}

import { Address } from "./Address";

export interface Company {
  id: string;
  name: string;
  phone: string;
  logo: string;
  address: Address;
  area: string;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
}

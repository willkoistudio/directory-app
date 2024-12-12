import { Address } from "./address";

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

export const COMPANIES_MOCKS: Company[] = [
  {
    id: "1",
    name: "Company 1",
    phone: "1234567890",
    logo: "https://via.placeholder.com/150",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "United States",
    },
    area: "Area 1",
    note: "Note 1",
  },
  {
    id: "2",
    name: "Company 2",
    phone: "1234567890",
    logo: "https://via.placeholder.com/150",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "United States",
    },
    area: "Area 2",
    note: "Note 2",
  },
  {
    id: "3",
    name: "Company 3",
    phone: "1234567890",
    logo: "https://via.placeholder.com/150",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "United States",
    },
    area: "Area 3",
    note: "Note 3",
  },
];

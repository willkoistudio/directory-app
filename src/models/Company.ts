import { Address, ADDRESS_MOCKS } from "./address";

export interface Company {
  id: string;
  name: string;
  phone: string;
  logo: string;
  address: Address;
  area: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export const COMPANIES_MOCKS: Company[] = [
  {
    id: "1",
    name: "Company 1",
    phone: "1234567890",
    logo: "https://via.placeholder.com/150",
    address: ADDRESS_MOCKS[0],
    area: "Area 1",
    note: "Note 1",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    id: "2",
    name: "Company 2",
    phone: "1234567890",
    logo: "https://via.placeholder.com/150",
    address: ADDRESS_MOCKS[1],
    area: "Area 2",
    note: "Note 2",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    id: "3",
    name: "Company 3",
    phone: "1234567890",
    logo: "https://via.placeholder.com/150",
    address: ADDRESS_MOCKS[2],
    area: "Area 3",
    note: "Note 3",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
];

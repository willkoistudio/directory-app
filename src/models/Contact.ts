export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Contact {
  id: string;
  name: string;
  companyId: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  phone: string;
  workPhone: string;
  fax: string;
  function: string;
  website: string;
  address: Address;
  keywords: string[];
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
}

export interface Company {
  id: string;
  name: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
}

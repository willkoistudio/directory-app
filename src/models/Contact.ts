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

export const CONTACT_MOCKS: Contact[] = [
  {
    id: "m5gr84i9",
    name: "Leanne Graham",
    companyId: "0",
    email: "ken99@yahoo.com",
    phone: "1-770-736-8031 x56442",
    workPhone: "010-692-6593 x09125",
    fax: "1-463-123-3447",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: {
      street: "Kulas Light",
      city: "Gwenborough",
      postalCode: "92998-3874",
      state: "New York",
      country: "United States",
    },
    keywords: ["keyword1", "keyword2", "keyword3"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3c23d152",
    name: "Ervin Howell",
    companyId: "0",
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    fax: "1-463-123-3447",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: {
      street: "1 GNX Drive",
      state: "CA",
      city: "Oakland",
      postalCode: "12345",
      country: "Canada",
    },
    keywords: ["keyword1"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3c23d152",
    name: "Will Smirs",
    companyId: "0",
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    fax: "1-463-123-3447",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: {
      street: "1 GNX Drive",
      city: "Oakland",
      state: "CA",
      postalCode: "12345",
      country: "Canada",
    },
    keywords: ["keyword1"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

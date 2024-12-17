import { Address, ADDRESS_MOCKS } from "./address";
import { COMPANIES_MOCKS, Company } from "./company";

export interface Contact {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  companyId: string;
  function: string;
  workPhone?: string;
  createdAt: string;
}

export interface ContactData {
  id?: string;
  name: string;
  company: Company;
  email: string;
  phone: string;
  workPhone?: string;
  fax?: string;
  notes?: string;
  function: string;
  website: string;
  address: Address;
  keywords: string[];
  avatar: string;
  createdAt: string;
  updatedAt?: string;
}

export const CONTACT_MOCKS: Contact[] = [
  {
    id: "m5gr84i9",
    name: "Leanne Graham",
    companyId: "1",
    email: "ken99@yahoo.com",
    phone: "1-770-736-8031 x56442",
    workPhone: "010-692-6593 x09125",
    function: "Chief Executive Officer",
    address: ADDRESS_MOCKS[0],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
  },
  {
    id: "3c23d152",
    name: "Ervin Howell",
    companyId: "2",
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    function: "Chief Executive Officer",
    address: ADDRESS_MOCKS[1],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
  },
  {
    id: "3c23d152",
    name: "Will Smirs",
    companyId: "3",
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    function: "Chief Executive Officer",
    address: ADDRESS_MOCKS[2],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
  },
];

export const CONTACT_DATA_MOCKS: ContactData[] = [
  {
    id: "m5gr84i9",
    name: "Leanne Graham",
    company: COMPANIES_MOCKS[0],
    email: "ken99@yahoo.com",
    phone: "1-770-736-8031 x56442",
    workPhone: "010-692-6593 x09125",
    fax: "010-692-6593 x09125",
    notes: "010-692-6593 x09125",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: ADDRESS_MOCKS[0],
    keywords: ["Leanne", "Graham"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
  },
  {
    id: "3c23d152",
    name: "Ervin Howell",
    company: COMPANIES_MOCKS[0],
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    fax: "010-692-6593 x09125",
    notes: "010-692-6593 x09125",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: ADDRESS_MOCKS[1],
    keywords: ["Ervin", "Howell"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
  },
  {
    id: "3c23d152",
    name: "Will Smirs",
    company: COMPANIES_MOCKS[0],
    email: "shanna@yahoo.com",
    phone: "010-692-6593 x09125",
    workPhone: "1-463-123-3447",
    fax: "010-692-6593 x09125",
    notes: "010-692-6593 x09125",
    function: "Chief Executive Officer",
    website: "www.hildegard.org",
    address: ADDRESS_MOCKS[2],
    keywords: ["Will", "Smirs"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
  },
];

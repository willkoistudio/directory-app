import { Address, ADDRESS_MOCKS } from "./address";

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
  createdAt?: string;
  updatedAt?: string;
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
    address: ADDRESS_MOCKS[0],
    keywords: ["keyword1", "keyword2", "keyword3"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
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
    address: ADDRESS_MOCKS[1],
    keywords: ["keyword1"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
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
    address: ADDRESS_MOCKS[2],
    keywords: ["keyword1"],
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
];

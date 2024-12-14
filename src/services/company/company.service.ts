import { Company } from "../../models/company";

export interface ServiceCompany {
  getCompanies: () => Promise<Company[]>;
  getCompanyDetail: (id: string) => Promise<Company>;
  addCompany: (company: Company) => Promise<void>;
  updateCompany: (company: Company) => Promise<void>;
  removeCompany: (id: string) => Promise<void>;
}

import { Company } from "../../models/company";

export interface ServiceCompany {
  getCompanies: () => Promise<Company[]>;
  addCompany: (company: Company) => Promise<void>;
  updateCompany: (company: Company) => Promise<void>;
  removeCompany: (id: string) => Promise<void>;
}

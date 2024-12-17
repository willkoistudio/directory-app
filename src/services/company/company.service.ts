import { Company, CompanyData } from "../../models/company";

export interface ServiceCompany {
  getCompanies: () => Promise<Company[]>;
  getCompanyDetail: (id: string) => Promise<CompanyData>;
  addCompany: (company: CompanyData) => Promise<void>;
  updateCompany: (company: Company) => Promise<void>;
  removeCompany: (id: string) => Promise<void>;
}

import { Company, CompanyData } from "../../models/Company";

export interface ServiceCompany {
  getCompanies: () => Promise<Company[]>;
  getCompanyDetail: (id: string) => Promise<CompanyData>;
  addCompany: (company: CompanyData) => Promise<CompanyData>;
  updateCompany: (company: Company) => Promise<void>;
  removeCompany: (id: string) => Promise<void>;
}

import axios from "axios";
import { ServiceCompany } from "./company.service";
import { Company, CompanyData } from "../../models/company";

export class ServiceCompanyHttp implements ServiceCompany {
  public async getCompanies(): Promise<Company[]> {
    try {
      const { data } = await axios.get<Company[]>(`companies`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching companies");
    }
  }

  public async getCompanyDetail(id: string): Promise<CompanyData> {
    try {
      const { data } = await axios.get<CompanyData>(`companies/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching company");
    }
  }

  public async addCompany(company: CompanyData): Promise<void> {
    try {
      const { data } = await axios.post<void>(`companies`, company);
      return data;
    } catch (erreur) {
      throw new Error("Error adding company");
    }
  }

  public async updateCompany(company: Company): Promise<void> {
    try {
      const { data } = await axios.put<void>(
        `companies/${company.id}`,
        company
      );
      return data;
    } catch (erreur) {
      throw new Error("Error updating company");
    }
  }

  public async removeCompany(id: string): Promise<void> {
    try {
      const { data } = await axios.delete<void>(`companies/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error removing company");
    }
  }
}

/** @format */

import apiClient from "../../lib/axios";
import { ServiceCompany } from "./company.service";
import { Company, CompanyData } from "../../models/Company";

export class ServiceCompanyHttp implements ServiceCompany {
  public async getCompanies(): Promise<Company[]> {
    try {
      const { data } = await apiClient.get<Company[]>(`companies`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching companies");
    }
  }

  public async getCompanyDetail(id: string): Promise<CompanyData> {
    try {
      const { data } = await apiClient.get<CompanyData>(`companies/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching company");
    }
  }

  public async addCompany(company: CompanyData): Promise<CompanyData> {
    try {
      const { data } = await apiClient.post<CompanyData>(`companies`, company);
      return data;
    } catch (erreur) {
      throw new Error("Error adding company");
    }
  }

  public async updateCompany(company: Company): Promise<void> {
    try {
      const { data } = await apiClient.put<void>(
        `companies/${company.id}`,
        company,
      );
      return data;
    } catch (erreur) {
      throw new Error("Error updating company");
    }
  }

  public async removeCompany(id: string): Promise<void> {
    try {
      const { data } = await apiClient.delete<void>(`companies/${id}`);
      return data;
    } catch (erreur) {
      throw new Error("Error removing company");
    }
  }
}

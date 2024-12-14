import { COMPANIES_MOCKS, Company } from "../../models/company";
import { ServiceCompany } from "./company.service";

export class ServiceCompanyMock implements ServiceCompany {
  public constructor(
    private companies: Company[] = COMPANIES_MOCKS,
    private latence = 1000
  ) {}

  public async getCompanies(): Promise<Company[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.companies), this.latence)
    );
  }

  public async getCompanyDetail(id: string): Promise<Company> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.companies[0]), this.latence)
    );
  }

  public async addCompany(contact: Company): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.companies.push(contact);
        resolve();
      }, this.latence)
    );
  }

  public async updateCompany(contact: Company): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.companies = this.companies.map((c) =>
          c.id === contact.id ? contact : c
        );
        resolve();
      }, this.latence)
    );
  }

  public async removeCompany(id: string): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.companies = this.companies.filter((c) => c.id !== id);
        resolve();
      }, this.latence)
    );
  }
}

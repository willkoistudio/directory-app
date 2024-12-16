import { useMemo } from "react";
import { APP_CONTEXT } from "../../../const/features";
import { Building2, UserRoundSearch } from "lucide-react";
import { SearchContact } from "../../../components/features/search-contact/SearchContact";
import { SearchCompany } from "../../../components/features/search-company/SearchCompany";
import { Contact } from "../../../models/contact";
import { Company } from "../../../models/company";

const useTabs = (
  fetchContacts: Function,
  fetchCompanies: Function,
  contacts: Contact[],
  companies: Company[],
  loading: boolean,
  removeContact: Function
) => {
  const tabs = [
    {
      value: APP_CONTEXT.CONTACT,
      label: "Contacts",
      icon: <UserRoundSearch size={16} />,
      content: <SearchContact {...{ contacts, loading, removeContact }} />,
    },
    {
      value: APP_CONTEXT.COMPANY,
      label: "Companies",
      icon: <Building2 size={16} />,
      content: <SearchCompany {...{ companies, loading }} />,
    },
  ];

  const handleTabsChange = async (value: APP_CONTEXT) => {
    switch (value) {
      case APP_CONTEXT.CONTACT:
        await fetchContacts();
        break;
      case APP_CONTEXT.COMPANY:
        await fetchCompanies();
        break;
      default:
        break;
    }
  };

  return { tabs, handleTabsChange };
};

export default useTabs;

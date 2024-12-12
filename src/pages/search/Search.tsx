import { FC, useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { Building2, UserRoundSearch } from "lucide-react";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { SearchContact } from "../../features/search-contact/SearchContact";
import { SearchCompany } from "../../features/search-company/SearchCompany";
import { APP_CONTEXT } from "../../helpers/const/features";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/contactSlice";
import { getCompanies } from "../../store/companySlice";
import { RootState } from "../../store/store";

const Search: FC = () => {
  const { setPageName } = usePageName();
  useEffect(() => {
    setPageName(ROUTE_NAMES.SEARCH); // Mettre à jour le nom de la page
  }, []);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { contacts } = useSelector((state: RootState) => state.contact);
  const { companies } = useSelector((state: RootState) => state.company);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      await dispatch(getContacts() as any);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      await dispatch(getCompanies() as any);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const tabs = [
    {
      value: APP_CONTEXT.CONTACT,
      label: "Contacts",
      icon: <UserRoundSearch size={16} />,
      content: <SearchContact {...{ contacts, loading }} />,
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

  return (
    <section>
      <Tabs defaultValue={APP_CONTEXT.CONTACT} className="mt-12">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="cursor-pointer hover:bg-gray h-14"
              onClick={() => {
                handleTabsChange(tab.value);
              }}
            >
              {tab.icon} {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export { Search };

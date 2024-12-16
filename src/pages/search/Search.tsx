import { FC, useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { Building2, UserRoundSearch } from "lucide-react";
import { ROUTE_NAMES } from "../../const/routes";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { APP_CONTEXT } from "../../const/features";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, removeContact } from "../../store/contactSlice";
import { getCompanies } from "../../store/companySlice";
import { RootState } from "../../store/store";
import useTabs from "./hooks/useTabs";

const Search: FC = () => {
  const { setPageName } = usePageName();
  useEffect(() => {
    setPageName(ROUTE_NAMES.SEARCH);
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
  const { tabs, handleTabsChange } = useTabs(
    fetchContacts,
    fetchCompanies,
    contacts,
    companies,
    loading,
    removeContact
  );

  useEffect(() => {
    fetchContacts();
  }, []);

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

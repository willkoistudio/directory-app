import { FC, useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../const/routes";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { APP_CONTEXT } from "../../const/features";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/contactSlice";
import { getCompanies } from "../../store/companySlice";
import { RootState } from "../../store/store";
import useTabs from "./hooks/useTabs";
import { Skeleton } from "../../components/ui/skeleton";

const Search: FC = () => {
  const { setPageName } = usePageName();
  const dispatch = useDispatch();

  const { contacts } = useSelector((state: RootState) => state.contact);
  const { companies } = useSelector((state: RootState) => state.company);
  const [loading, setLoading] = useState(true);

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
  );

  useEffect(() => {
    fetchContacts();
    setPageName(ROUTE_NAMES.SEARCH);
  }, []);

  return (
    <section>
      {loading && !contacts.length && !companies.length ? (
        <div>
          <Skeleton className="bg-white/10 h-14 w-full mb-4" />
          <div className="flex justify-between mb-8">
            <Skeleton className="bg-white/10 h-12 w-1/2" />
            <Skeleton className="bg-white/10 h-12 w-[120px]" />
          </div>
          <Skeleton className="bg-white/10 h-[400px] w-full" />
        </div>
      ) : (
        <Tabs defaultValue={APP_CONTEXT.CONTACT}>
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
                <span className="mr-2">{tab.icon}</span>{" "}
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent value={tab.value} key={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </section>
  );
};

export { Search };

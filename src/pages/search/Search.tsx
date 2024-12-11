import { FC, useEffect } from "react";
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

const Search: FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName(ROUTE_NAMES.SEARCH); // Mettre à jour le nom de la page
  }, []);

  return (
    <section>
      <Tabs defaultValue="contact" className="mt-12">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 h-auto">
          <TabsTrigger
            value="contact"
            className="cursor-pointer hover:bg-gray h-14"
          >
            <UserRoundSearch className="mr-2" size={16} /> Contacts
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="cursor-pointer hover:bg-gray h-14"
          >
            <Building2 className="mr-2" size={16} />
            Companies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="contact" className="px-1 pt-4">
          {<SearchContact />}
        </TabsContent>
        <TabsContent value="company">{<SearchCompany />}</TabsContent>
      </Tabs>
    </section>
  );
};

export { Search };

import { useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../const/routes";
import { Card } from "../../components/ui/card";
import {
  Building2,
  MapPinHouse,
  NotebookPen,
  Pencil,
  PhoneCall,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanies } from "../../store/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getContactDetail } from "../../store/contactSlice";
import { Skeleton } from "../../components/ui/skeleton";
import { useCountryStateCity } from "../../context/CountryStateCityContext";

const ContactDetail: React.FC = () => {
  const { setPageName } = usePageName();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { companies } = useSelector((state: RootState) => state.company);
  const { contactDetail } = useSelector((state: RootState) => state.contact);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const { fetchCountries, countries, loadingLocations } = useCountryStateCity();

  const fetchRessources = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      await dispatch(getCompanies() as any);
      await dispatch(getContactDetail(id) as any);
      await fetchCountries();
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCountryName = (countryId: string | undefined) => {
    if (!countryId) {
      return "N/A";
    }
    const country = countries.find(
      (country) => String(country.id) === countryId
    );
    return country?.name;
  };

  const getCountryFlag = (countryId: string | undefined) => {
    if (!countryId) {
      return "N/A";
    }
    const country = countries.find(
      (country) => String(country.id) === countryId
    );
    return country?.emoji;
  };

  const getCompanyName = (companyId: string | undefined) => {
    if (!companyId) {
      return "N/A";
    }
    const company = companies.find(
      (company) => String(company.id) === companyId
    );
    return company?.name;
  };

  useEffect(() => {
    fetchRessources();
    setPageName(ROUTE_NAMES.CONTACT_DETAIL); // Mettre à jour le nom de la page
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between mt-12">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to search page
        </Button>
        <Button
          className="bg-red"
          onClick={() => navigate(`/edit-contact/${id}`)}
        >
          <Pencil /> Edit contact
        </Button>
      </nav>
      {loading || loadingLocations ? (
        <div className="mt-8 mb-12 grid grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[300px] bg-white/10 w-full" />
          ))}
        </div>
      ) : Boolean(!contactDetail) ? (
        <div className="mt-8 mb-12 flex justify-center items-center gap-8">
          <p>Contact not found</p>
        </div>
      ) : (
        <section className="mt-8 mb-12 grid grid-cols-2 gap-8">
          <Card className="px-8 py-8 border-white/20">
            <div className="flex gap-4 items-center">
              <div className="rounded-full overflow-hidden">
                <img
                  src={contactDetail?.avatar}
                  alt={contactDetail?.name}
                  width="100px"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{contactDetail?.name}</p>
                <p className="text-gray">{contactDetail?.email}</p>
              </div>
              <div className="border-l border-gray pl-4">
                <p className="pb-1">Keywords</p>
                <div className="flex gap-2">
                  {contactDetail?.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <div className="border-r border-gray pr-4">
                <p>Job title</p>
                <p className="text-gray">{contactDetail?.function}</p>
              </div>
              <div className="border-r border-gray pr-4">
                <p>Website</p>
                <p className="text-gray">{contactDetail?.website}</p>
              </div>
              <div className="border-r border-gray pr-4">
                <p>Country</p>
                <p className="text-gray">
                  {getCountryName(contactDetail?.address.countryId)}
                  {getCountryFlag(contactDetail?.address.countryId)}
                </p>
              </div>
              <div>
                <p>Date created</p>
                <p className="text-gray">{contactDetail?.createdAt}</p>
              </div>
            </div>
            {contactDetail?.updatedAt && (
              <div className="flex mt-8">
                <p className="ml-auto mr-0 text-sm text-gray">
                  Updated: {contactDetail?.updatedAt}
                </p>
              </div>
            )}
          </Card>
          <Card className="px-8 py-8 border-white/20">
            <div className="flex justify-between">
              <p className="text-2xl font-bold flex items-center">
                <Building2 className="mr-2" /> <span>Company infos</span>
              </p>
              <Button
                className="bg-gray"
                onClick={() => navigate(`company/${contactDetail?.company.id}`)}
              >
                <SquareArrowOutUpRight /> View details
              </Button>
            </div>
            <div className="grid gap-4 mt-8 grid-cols-2">
              <div>
                <div className="mb-2">
                  <p>Name</p>
                  <p className="text-gray">
                    {getCompanyName(contactDetail?.company.id)}
                  </p>
                </div>
                <div className="mb-2">
                  <p>Area</p>
                  <p className="text-gray">{contactDetail?.company.area}</p>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <p>Phone</p>
                  <p className="text-gray">{contactDetail?.company.phone}</p>
                </div>
                <div className="mb-2">
                  <p>Country</p>
                  <p className="text-gray">
                    {getCountryName(contactDetail?.company.address.countryId)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="px-8 py-8 border-white/20">
            <p className="text-2xl font-bold flex items-center">
              <PhoneCall className="mr-2" /> <span>Phone numbers</span>
            </p>
            <div className="flex gap-4 mt-8">
              <div className="border-r border-gray pr-4">
                <p>Cellular</p>
                <p className="text-gray">{contactDetail?.phone}</p>
              </div>
              <div className="border-r border-gray pr-4">
                <p>Work </p>
                <p className="text-gray">{contactDetail?.workPhone}</p>
              </div>
              <div>
                <p>Fax</p>
                <p className="text-gray">{contactDetail?.fax}</p>
              </div>
            </div>
          </Card>
          <Card className="px-8 py-8 border-white/20">
            <p className="text-2xl font-bold flex items-center">
              <MapPinHouse className="mr-2" /> <span>Address</span>
            </p>
            <div className="grid gap-4 grid-cols-2 mt-8">
              <div className="mb-2">
                <p>Street</p>
                <p className="text-gray">{contactDetail?.address.street}</p>
              </div>
              <div className="mb-2">
                <p>City</p>
                <p className="text-gray">{contactDetail?.address.cityId}</p>
              </div>
              <div className="mb-2">
                <p>Postal Code</p>
                <p className="text-gray">{contactDetail?.address.postalCode}</p>
              </div>
              <div className="mb-2">
                <p>Country</p>
                <p className="text-gray">{contactDetail?.address.countryId}</p>
              </div>
            </div>
          </Card>
          <Card className="px-8 py-8 border-white/20">
            <p className="text-2xl font-bold flex items-center mb-4">
              <NotebookPen className="mr-2" /> <span>Notes</span>
            </p>
            <p className="border-l-4 border-gray pl-4">
              {contactDetail?.notes}
            </p>
          </Card>
        </section>
      )}
    </>
  );
};

export { ContactDetail };

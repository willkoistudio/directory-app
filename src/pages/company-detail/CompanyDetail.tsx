import React, { useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../const/routes";
import { Card } from "../../components/ui/card";
import { MapPinHouse, NotebookPen, Pencil, PhoneCall } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCountryStateCity } from "../../context/CountryStateCityContext";
import { getCompanyDetail } from "../../store/companySlice";
import { Skeleton } from "../../components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../lib/utils";
import styles from "./CompanyDetail.module.scss";

const CompanyDetail: React.FC = () => {
  const { setPageName } = usePageName();
  const { t } = useTranslation();

  const { companyDetail } = useSelector((state: RootState) => state.company);
  const { id } = useParams<{ id: string }>();
  const { fetchCountries, countries, loadingLocations } = useCountryStateCity();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const fetchRessources = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      await dispatch(getCompanyDetail(id) as any);
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
      (country) => String(country.id) === countryId,
    );
    return country?.name;
  };

  const getCountryFlag = (countryId: string | undefined) => {
    if (!countryId) {
      return "N/A";
    }
    const country = countries.find(
      (country) => String(country.id) === countryId,
    );
    return country?.emoji;
  };

  useEffect(() => {
    fetchRessources();
    setPageName(ROUTE_NAMES.COMPANY_DETAIL); // Mettre à jour le nom de la page
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          {t("companyDetail.backToSearch")}
        </Button>
        <Button
          className="bg-red"
          onClick={() => navigate(`/edit-company/${id}`)}
        >
          <Pencil /> {t("companyDetail.editCompany")}
        </Button>
      </nav>
      {loading || loadingLocations ? (
        <div className="mt-8 mb-12 grid grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[300px] bg-white/10 w-full" />
          ))}
        </div>
      ) : Boolean(!companyDetail) ? (
        <div className="mt-8 mb-12 flex justify-center items-center gap-8">
          <p>{t("companyDetail.companyNotFound")}</p>
        </div>
      ) : (
        <section className="mt-8 mb-12 grid grid-cols-2 gap-8">
          <Card className="px-8 py-8 border-white/20">
            <div className="flex gap-4 items-center">
              <div className="rounded-full overflow-hidden">
                <img
                  src={companyDetail?.logo}
                  alt={companyDetail?.name}
                  width="100px"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{companyDetail?.name}</p>
                <p className="text-gray">{companyDetail?.area}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <div className="border-r border-gray pr-4">
                <p>{t("companyDetail.website")}</p>
                <p className={`text-gray ${styles.companyWebsite}`}>
                  <a
                    href={companyDetail?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {companyDetail?.website}
                  </a>
                </p>
              </div>
              <div className="border-r border-gray pr-4">
                <p>{t("companyDetail.country")}</p>
                <p className="text-gray">
                  {getCountryName(companyDetail?.address.countryId)}
                  {getCountryFlag(companyDetail?.address.countryId)}
                </p>
              </div>
              <div>
                <p>{t("companyDetail.dateCreated")}</p>
                <p className="text-gray">
                  {formatDate(String(companyDetail?.createdAt))}
                </p>
              </div>
            </div>
            {companyDetail?.updatedAt && (
              <div className="flex mt-8">
                <p className="ml-auto mr-0 text-sm text-gray">
                  {t("companyDetail.updated")}{" "}
                  {formatDate(companyDetail?.updatedAt)}
                </p>
              </div>
            )}
          </Card>
          <Card className="px-8 py-8 border-white/20">
            <p className="text-2xl font-bold flex items-center">
              <PhoneCall className="mr-2" />{" "}
              <span>{t("companyDetail.phoneNumbers")}</span>
            </p>
            <div className="flex gap-4 mt-8">
              <div className="border-r border-gray pr-4">
                <p>{t("companyDetail.cellular")}</p>
                <p className="text-gray">{companyDetail?.phone}</p>
              </div>
              <div>
                <p>{t("companyDetail.fax")}</p>
                <p className="text-gray">{companyDetail?.fax}</p>
              </div>
            </div>
          </Card>
          <Card className="px-8 py-8 border-white/20">
            <p className="text-2xl font-bold flex items-center">
              <MapPinHouse className="mr-2" />{" "}
              <span>{t("companyDetail.address")}</span>
            </p>
            <div className="grid gap-4 grid-cols-2 mt-8">
              <div className="mb-2">
                <p>{t("companyDetail.street")}</p>
                <p className="text-gray">{companyDetail?.address.street}</p>
              </div>
              <div className="mb-2">
                <p>{t("companyDetail.city")}</p>
                <p className="text-gray">{companyDetail?.address.cityId}</p>
              </div>
              <div className="mb-2">
                <p>{t("companyDetail.postalCode")}</p>
                <p className="text-gray">{companyDetail?.address.postalCode}</p>
              </div>
              <div className="mb-2">
                <p>{t("companyDetail.country")}</p>
                <p className="text-gray">{companyDetail?.address.countryId}</p>
              </div>
            </div>
          </Card>
          <Card className="px-8 py-8 border-white/20">
            <p className="text-2xl font-bold flex items-center mb-4">
              <NotebookPen className="mr-2" />{" "}
              <span>{t("companyDetail.notes")}</span>
            </p>
            <p className="border-l-4 border-gray pl-4">
              {companyDetail?.notes}
            </p>
          </Card>
        </section>
      )}
    </>
  );
};

export { CompanyDetail };

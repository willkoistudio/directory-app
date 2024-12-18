import { FC, useEffect, useState } from "react";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Card } from "../../../ui/card";
import { CSC_City, CSC_Country, CSC_State } from "../../../../models/location";
import { AddCompanyFormSchema } from "../../../../pages/add-company/hooks/useAddCompanyForm";
import { t } from "i18next";

interface AddCompanyThirdStepProps extends UseFormReturn<AddCompanyFormSchema> {
  onSubmit: () => void;
  countries: CSC_Country[];
  states: CSC_State[];
  cities: CSC_City[];
}

const AddCompanyThirdStep: FC<AddCompanyThirdStepProps> = ({
  getValues,
  onSubmit,
  countries,
  states,
  cities,
}) => {
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");

  const getCountryName = () => {
    const country = countries.find(
      (country) => String(country.id) === String(getValues("address.countryId"))
    );
    setCountryName(country?.name ?? "");
  };

  const getStateName = () => {
    const state = states.find(
      (state) => String(state.id) === String(getValues("address.stateId"))
    );
    setStateName(state?.name ?? "");
  };

  const getCityName = () => {
    const city = cities.find(
      (city) => String(city.id) === String(getValues("address.cityId"))
    );
    setCityName(city?.name ?? "");
  };

  useEffect(() => {
    getCountryName();
  }, [countries]);

  useEffect(() => {
    getStateName();
  }, [states]);

  useEffect(() => {
    getCityName();
  }, [cities]);

  return (
    <>
      <p className="text-2xl  mt-8">{t("addCompany.step3.summary")}</p>
      <div className="py-12 flex gap-8 flex-row">
        <div className="basis-1/4">
          <div
            className="h-[350px] w-[350px] bg-cover bg-center rounded-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${
                getValues("logo") || "https://via.placeholder.com/350"
              })`,
            }}
          >
            <Label className="font-bold mb-2 block">
              {t("addCompany.step3.companyLogo")}
            </Label>
          </div>
        </div>
        <Card className="px-8 py-8 basis-1/2">
          <div>
            <div className="pb-4">
              <Label className="font-bold">{t("addCompany.step2.name")}</Label>
              <p className="text-gray">{getValues("name") || "N/A"}</p>
            </div>

            <div className="pb-4">
              <Label className="font-bold">{t("addCompany.step2.phone")}</Label>
              <p className="text-gray">{getValues("phone") || "N/A"}</p>
            </div>

            <div className="pb-4">
              <Label className="font-bold">{t("addCompany.step2.area")}</Label>
              <p className="text-gray">{getValues("area") || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">{t("addCompany.step2.fax")}</Label>
              <p className="text-gray">{getValues("fax") || "N/A"}</p>
            </div>
            <div>
              <Label className="font-bold">
                {t("addCompany.step2.website")}
              </Label>
              <p className="text-gray">{getValues("website") || "N/A"}</p>
            </div>
          </div>
        </Card>
        <Card className="px-8 py-8 basis-1/2">
          <div>
            <div className="pb-4">
              <Label className="font-bold">{t("addCompany.step2.notes")}</Label>
              <p className="text-gray">{getValues("notes") || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">
                {t("addCompany.step2.country")}
              </Label>
              <p className="text-gray">{countryName || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">{t("addCompany.step2.state")}</Label>
              <p className="text-gray">{stateName || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">{t("addCompany.step2.city")}</Label>
              <p className="text-gray">{cityName || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">
                {t("addCompany.step2.street")}
              </Label>
              <p className="text-gray">
                {getValues("address.street") || "N/A"}
              </p>
            </div>
            <div>
              <Label className="font-bold">
                {t("addCompany.step2.postalCode")}
              </Label>
              <p className="text-gray">
                {getValues("address.postalCode") || "N/A"}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-center px-8 w-full">
        <Button className="bg-red hover:bg-red/90 h-14 px-8" onClick={onSubmit}>
          <Save /> {t("addCompany.step3.saveCompany")}
        </Button>
      </div>
    </>
  );
};

export { AddCompanyThirdStep };

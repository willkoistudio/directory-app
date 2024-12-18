import { t } from "i18next";
import { FormFieldData } from "../../../../const/form";

export const fieldsData: FormFieldData[] = [
  {
    name: "name",
    label: t("addCompany.step2.name"),
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: t("addCompany.step2.phone"),
    type: "tel",
    required: true,
  },
  {
    name: "fax",
    label: t("addCompany.step2.fax"),
    type: "tel",
    required: true,
  },
  {
    name: "website",
    label: t("addCompany.step2.website"),
    type: "url",
    required: true,
  },
  {
    name: "area",
    label: t("addCompany.step2.area"),
    type: "text",
    required: true,
  },
  {
    name: "address.countryId",
    label: t("addCompany.step2.country"),
    type: "autocomplete",
    placeholder: t("addCompany.step2.selectCountry"),
    required: true,
  },
  {
    name: "address.stateId",
    label: t("addCompany.step2.state"),
    type: "autocomplete",
    placeholder: t("addCompany.step2.selectState"),
    required: true,
  },
  {
    name: "address.cityId",
    label: t("addCompany.step2.city"),
    type: "autocomplete",
    placeholder: t("addCompany.step2.selectCity"),
    required: true,
  },
  {
    name: "address.postalCode",
    label: t("addCompany.step2.postalCode"),
    type: "text",
    required: true,
  },
  {
    name: "address.street",
    label: t("addCompany.step2.street"),
    type: "text",
    required: true,
  },
  {
    name: "notes",
    label: t("addCompany.step2.notes"),
    type: "textarea",
    required: true,
  },
];

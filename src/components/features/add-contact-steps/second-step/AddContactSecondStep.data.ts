import { t } from "i18next";
import { FormFieldData } from "../../../../const/form";

export const fieldsData: FormFieldData[] = [
  {
    name: "name",
    label: t("addContact.step2.name"),
    type: "text",
    required: true,
  },
  {
    name: "companyId",
    label: t("addContact.step2.company"),
    type: "autocomplete",
    placeholder: t("addContact.step2.selectCompany"),
    required: true,
  },
  {
    name: "function",
    label: t("addContact.step2.function"),
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: t("addContact.step2.email"),
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: t("addContact.step2.phone"),
    type: "tel",
    required: true,
  },
  {
    name: "address.countryId",
    label: t("addContact.step2.country"),
    type: "autocomplete",
    placeholder: t("addContact.step2.selectCountry"),
    required: true,
  },
  {
    name: "address.stateId",
    label: t("addContact.step2.state"),
    type: "autocomplete",
    placeholder: t("addContact.step2.selectState"),
    required: true,
  },
  {
    name: "address.cityId",
    label: t("addContact.step2.city"),
    type: "autocomplete",
    placeholder: t("addContact.step2.selectCity"),
    required: true,
  },
  {
    name: "address.postalCode",
    label: t("addContact.step2.postalCode"),
    type: "text",
    required: true,
  },
  {
    name: "address.street",
    label: t("addContact.step2.street"),
    type: "text",
    required: true,
  },
];

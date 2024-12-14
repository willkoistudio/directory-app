import { FormFieldData } from "../../../../helpers/const/form";

export const fieldsData: FormFieldData[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "companyId",
    label: "Company",
    type: "select",
    placeholder: "Select a company",
  },
  {
    name: "function",
    label: "Function",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
  },
  {
    name: "address.street",
    label: "Street",
    type: "text",
  },
  {
    name: "address.cityId",
    label: "City",
    type: "select",
    placeholder: "Select a city",
  },
  {
    name: "address.postalCode",
    label: "Postal Code",
    type: "text",
  },
  {
    name: "address.stateId",
    label: "State",
    type: "select",
    placeholder: "Select a state",
  },
  {
    name: "address.countryId",
    label: "Country",
    type: "select",
    placeholder: "Select a country",
  },
];

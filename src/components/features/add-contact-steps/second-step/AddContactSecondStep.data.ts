import { FormFieldData } from "../../../../const/form";

export const fieldsData: FormFieldData[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "companyId",
    label: "Company",
    type: "autocomplete",
    placeholder: "Select a company",
    required: true,
  },
  {
    name: "function",
    label: "Function",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: true,
  },
  {
    name: "address.countryId",
    label: "Country",
    type: "autocomplete",
    placeholder: "Select a country",
    required: true,
  },
  {
    name: "address.stateId",
    label: "State",
    type: "autocomplete",
    placeholder: "Select a state",
    required: true,
  },
  {
    name: "address.cityId",
    label: "City",
    type: "autocomplete",
    placeholder: "Select a city",
    required: true,
  },
  {
    name: "address.postalCode",
    label: "Postal Code",
    type: "text",
    required: true,
  },
  {
    name: "address.street",
    label: "Street",
    type: "text",
    required: true,
  },
];

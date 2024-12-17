import { FormFieldData } from "../../../../const/form";

export const fieldsData: FormFieldData[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: true,
  },
  {
    name: "fax",
    label: "Fax",
    type: "tel",
    required: true,
  },
  {
    name: "website",
    label: "Website",
    type: "url",
    required: true,
  },
  {
    name: "area",
    label: "Area",
    type: "text",
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
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    required: true,
  },
];

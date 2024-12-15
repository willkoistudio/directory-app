import { FC, useState } from "react";
import { Input } from "../../../ui/input";
import { Company } from "../../../../models/company";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../../pages/add-contact/hooks/useAddContactForm";
import { fieldsData } from "./AddContactSecondStep.data";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import Autocomplete from "../../../ui/autocomplete/autocomplete";
import { CSC_City, CSC_Country, CSC_State } from "../../../../models/location";
import { AutoCompleteItem } from "../../../ui/autocomplete/AutoComplete.def";

interface AddContactSecondStepForm {
  name: string;
  companyId: string;
  function: string;
  email: string;
  phone: string;
  address: {
    street: string;
    cityId: string;
    postalCode: string;
    stateId: string;
    countryId: string;
  };
}

interface AddContactSecondStepProps
  extends UseFormReturn<AddContactFormSchema> {
  companies: Company[];
  cities: CSC_City[];
  countries: CSC_Country[];
  states: CSC_State[];
}

const AddContactSecondStep: FC<AddContactSecondStepProps> = ({
  getValues,
  control,
  trigger,
  companies,
  cities,
  countries,
  states,
}) => {
  const [formLocal, setFormLocal] = useState<AddContactSecondStepForm>({
    name: getValues("name"),
    companyId: getValues("companyId"),
    function: getValues("function"),
    email: getValues("email"),
    phone: getValues("phone"),
    address: {
      street: getValues("address.street"),
      cityId: getValues("address.cityId"),
      postalCode: getValues("address.postalCode"),
      stateId: getValues("address.stateId"),
      countryId: getValues("address.countryId"),
    },
  });

  const onFormChange = (
    value: string,
    field: ControllerRenderProps<AddContactFormSchema>
  ) => {
    setFormLocal((prev) => ({
      ...prev,
      [field.name]: value,
    }));
    field.onChange(value);
    trigger(field.name);
  };

  const getItems = (name: string): AutoCompleteItem[] => {
    switch (name) {
      case "companyId":
        return (
          companies.map((company) => {
            return {
              label: company.name,
              value: company.id,
            };
          }) ?? []
        );
      case "address.cityId":
        return (
          cities.map((city) => {
            return {
              label: city.name,
              value: String(city.id),
            };
          }) ?? []
        );
      case "address.stateId":
        return (
          states.map((state) => {
            return {
              label: state.name,
              value: String(state.id),
            };
          }) ?? []
        );
      case "address.countryId":
        return (
          countries.map((country) => {
            return {
              label: country.name,
              value: String(country.id),
            };
          }) ?? []
        );
      default:
        return [];
    }
  };

  const getLocalStateValue = (name: string) => {
    switch (name) {
      case "name":
        return formLocal.name;
      case "companyId":
        return formLocal.companyId;
      case "function":
        return formLocal.function;
      case "email":
        return formLocal.email;
      case "phone":
        return formLocal.phone;
      case "address.street":
        return formLocal.address.street;
      case "address.postalCode":
        return formLocal.address.postalCode;
      case "address.cityId":
        return formLocal.address.cityId;
      case "address.stateId":
        return formLocal.address.stateId;
      case "address.countryId":
        return formLocal.address.countryId;
      default:
        return "";
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-8 mt-12 px-8">
        {fieldsData.map((fieldData, idFieldData) =>
          fieldData.type !== "select" ? (
            <FormField
              key={idFieldData}
              control={control}
              name={fieldData.name as keyof AddContactFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldData.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={getLocalStateValue(field.name)}
                      onChange={(e) => onFormChange(e.target.value, field)}
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={control}
              key={idFieldData}
              name={fieldData.name as keyof AddContactFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldData.label}</FormLabel>
                  <Autocomplete
                    options={getItems(field.name)}
                    value={getLocalStateValue(field.name)}
                    onChange={(value) => onFormChange(value, field)}
                  />
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
          )
        )}
      </section>
    </>
  );
};

export { AddContactSecondStep };

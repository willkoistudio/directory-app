import { FC, useState } from "react";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { fieldsData } from "./AddCompanySecondStep.data";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { AutoCompleteItem } from "../../../ui/autocomplete/AutoComplete.def";
import { CSC_City, CSC_Country, CSC_State } from "../../../../models/location";
import Autocomplete from "../../../ui/autocomplete/Autocomplete";
import { AddCompanyFormSchema } from "../../../../pages/add-company/hooks/useAddCompanyForm";

interface AddCompanySecondStepForm {
  name: string;
  phone: string;
  fax?: string;
  website?: string;
  area?: string;
  notes?: string;
  address: {
    street: string;
    cityId: string;
    postalCode: string;
    stateId: string;
    countryId: string;
  };
}

interface AddCompanySecondStepProps extends UseFormReturn<AddCompanyFormSchema> {
  cities: CSC_City[];
  countries: CSC_Country[];
  states: CSC_State[];
  selectCountry: (countryCode: string) => void;
  getCities: (stateCode: string) => CSC_City[];
  loadingLocations: boolean;
}

const AddCompanySecondStep: FC<AddCompanySecondStepProps> = ({
  control,
  getValues,
  trigger,
  cities,
  countries,
  states,
  selectCountry,
  getCities,
  loadingLocations,
}) => {
  const [formLocal, setFormLocal] = useState<AddCompanySecondStepForm>({
    name: getValues("name"),
    phone: getValues("phone"),
    fax: getValues("fax"),
    website: getValues("website"),
    area: getValues("area"),
    notes: getValues("notes"),
    address: {
      street: getValues("address.street"),
      postalCode: getValues("address.postalCode"),
      cityId: getValues("address.cityId"),
      stateId: getValues("address.stateId"),
      countryId: getValues("address.countryId"),
    },
  });

  const onFormChange = (
    value: string,
    field: ControllerRenderProps<AddCompanyFormSchema>,
  ) => {
    console.log("onFormChange called:", field.name, value);
    setFormLocal((prev) => {
      if (field.name.startsWith("address.")) {
        const addressField = field.name.split(".")[1];
        return {
          ...prev,
          address: {
            ...prev.address,
            [addressField]: value,
          },
        };
      }

      return {
        ...prev,
        [field.name]: value,
      };
    });
    field.onChange(value);
    trigger(field.name);
    if (field.name === "address.countryId") {
      console.log("Country selected, value:", value, "type:", typeof value);
      console.log("Countries available:", countries.length);
      console.log(
        "First country:",
        countries[0],
        "id type:",
        typeof countries[0]?.id,
      );
      const country = countries.find((c) => String(c.id) === String(value));
      console.log("Found country:", country);
      if (country) selectCountry(country.iso2);
    } else if (field.name === "address.stateId") {
      const state = states.find((s) => String(s.id) === String(value));
      if (state) getCities(state.iso2);
    }
  };

  const getItems = (name: string): AutoCompleteItem[] => {
    switch (name) {
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
      case "phone":
        return formLocal.phone;
      case "fax":
        return formLocal.fax ?? "";
      case "website":
        return formLocal.website ?? "";
      case "area":
        return formLocal.area ?? "";
      case "notes":
        return formLocal.notes ?? "";
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
      <section className="grid grid-cols-2 gap-8 px-8">
        {fieldsData.map((fieldData, idFieldData) =>
          fieldData.type === "autocomplete" ? (
            <FormField
              control={control}
              key={idFieldData}
              name={fieldData.name as keyof AddCompanyFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldData.label}{" "}
                    {fieldData.required && <span className="text-red">*</span>}
                  </FormLabel>
                  <Autocomplete
                    disabled={loadingLocations}
                    options={getItems(field.name)}
                    value={String(field.value ?? "")}
                    onChange={(value) => onFormChange(value, field)}
                  />
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              key={idFieldData}
              control={control}
              name={fieldData.name as keyof AddCompanyFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldData.label}{" "}
                    {fieldData.required && <span className="text-red">*</span>}
                  </FormLabel>
                  <FormControl>
                    {fieldData.type === "textarea" ? (
                      <Textarea
                        {...field}
                        value={getLocalStateValue(field.name)}
                        onInput={(e) =>
                          onFormChange(e.currentTarget.value, field)
                        }
                      />
                    ) : (
                      <Input
                        type="text"
                        {...field}
                        value={getLocalStateValue(field.name)}
                        onInput={(e) =>
                          onFormChange(e.currentTarget.value, field)
                        }
                      />
                    )}
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />
          ),
        )}
      </section>
    </>
  );
};

export { AddCompanySecondStep };

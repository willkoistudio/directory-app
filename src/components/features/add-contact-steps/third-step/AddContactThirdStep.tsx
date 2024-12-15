import { FC, useState } from "react";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../../pages/add-contact/hooks/useAddContactForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { fieldsData } from "./AddContactThirdStep.data";

interface AddContactThirdStepForm {
  fax: string;
  workPhone: string;
  website: string;
  notes: string;
}

const AddContactThirdStep: FC<UseFormReturn<AddContactFormSchema>> = ({
  control,
  getValues,
  trigger,
}) => {
  const [formLocal, setFormLocal] = useState<AddContactThirdStepForm>({
    fax: getValues("fax") ?? "",
    workPhone: getValues("workPhone") ?? "",
    website: getValues("website") ?? "",
    notes: getValues("notes") ?? "",
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

  const getLocalStateValue = (name: string) => {
    switch (name) {
      case "fax":
        return formLocal.fax;
      case "workPhone":
        return formLocal.workPhone;
      case "website":
        return formLocal.website;
      case "notes":
        return formLocal.notes;
      default:
        return "";
    }
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-8 px-8 mt-12">
        {fieldsData.map((fieldData, idFieldData) =>
          fieldData.type !== "textarea" ? (
            <FormField
              key={idFieldData}
              control={control}
              name={fieldData.name as keyof AddContactFormSchema}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldData.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={fieldData.type}
                      {...field}
                      value={getLocalStateValue(field.name)}
                      onInput={(e) =>
                        onFormChange(e.currentTarget.value, field)
                      }
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
                  <Textarea
                    {...field}
                    value={getLocalStateValue(field.name)}
                    onInput={(e) => onFormChange(e.currentTarget.value, field)}
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

export { AddContactThirdStep };

import { FC, useState } from "react";
import { Input } from "../../../ui/input";
import { X } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../../pages/add-contact/hooks/useAddContactForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { t } from "i18next";

const AddContactFourthStep: FC<UseFormReturn<AddContactFormSchema>> = ({
  control,
  getValues,
  trigger,
}) => {
  const [keywords, setKeywords] = useState<string[]>(getValues("keywords"));
  const [inputValue, setInputValue] = useState<string>("");

  const onFormChange = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<AddContactFormSchema>
  ) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    if (inputValue.trim()) {
      const updated = [...keywords, inputValue.trim()];
      setKeywords(updated);
      setInputValue("");
      field.onChange(updated);
      trigger("keywords");
    }
  };

  const removeKeyword = (
    index: number,
    field: ControllerRenderProps<AddContactFormSchema>
  ) => {
    const updated = keywords.filter((_, i) => i !== index);
    setKeywords(updated);
    field.onChange(updated);
    trigger("keywords");
  };

  return (
    <section>
      <div className="mt-12 w-1/2 mx-auto">
        <FormField
          control={control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("addContact.step4.keywords")}{" "}
                <span className="text-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className=" h-14"
                  placeholder={t("addContact.step4.formInfoKeywords")}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => onFormChange(e, field)}
                />
              </FormControl>
              <div className="flex flex-wrap justify-center !mt-8">
                {keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-red px-4 py-2 rounded-lg mx-2 mb-4 relative group"
                  >
                    <span
                      className="absolute -top-2 -right-3 cursor-pointer bg-white rounded-full px-1.5 opacity-0 group-hover:opacity-100"
                      onClick={() => removeKeyword(index, field)}
                    >
                      <X width={12} className="text-red" />
                    </span>
                    {keyword}
                  </div>
                ))}
              </div>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export { AddContactFourthStep };

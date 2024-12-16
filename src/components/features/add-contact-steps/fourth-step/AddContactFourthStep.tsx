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
    if (inputValue) {
      setKeywords([...keywords, inputValue]);
      setInputValue("");
      field.onChange(keywords);
    }

    trigger("keywords");
  };

  const removeKeyword = (
    index: number,
    field: ControllerRenderProps<AddContactFormSchema>
  ) => {
    setKeywords(keywords.filter((_, i) => i !== index));
    field.onChange(keywords);
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
                Keywords <span className="text-red">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className=" h-14"
                  placeholder="Add a keyword and press enter"
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

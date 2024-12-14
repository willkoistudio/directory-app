import { FC } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../pages/add-contact/hooks/useAddContactForm";

const AddContactThirdStep: FC<UseFormReturn<AddContactFormSchema>> = () => {
  return (
    <>
      <section className="grid grid-cols-2 gap-8 px-8 mt-12">
        <div>
          <Label>Fax</Label>
          <Input type="phone" />
        </div>
        <div>
          <Label>Work phone</Label>
          <Input type="phone" />
        </div>
        <div>
          <Label>Website</Label>
          <Input type="url" />
        </div>
        <div>
          <Label>Notes</Label>
          <Textarea />
        </div>
      </section>
    </>
  );
};

export { AddContactThirdStep };

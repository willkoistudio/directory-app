import { FC } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const AddContactThirdStep: FC = () => {
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

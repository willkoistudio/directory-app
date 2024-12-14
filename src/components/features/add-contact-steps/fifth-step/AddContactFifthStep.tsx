import { FC } from "react";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../../pages/add-contact/hooks/useAddContactForm";

const AddContactFifthStep: FC<UseFormReturn<AddContactFormSchema>> = () => {
  return (
    <>
      <p className="text-2xl1 text-center pt-8 pb-8">
        Here is a preview of your contact
      </p>
      <section className="grid grid-cols-2 gap-8 px-8">
        <div>
          <div className="pb-4">
            <Label className="font-bold">Name</Label>
            <p className="text-gray">John Doe</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Company</Label>
            <p className="text-gray">Apple</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Function</Label>
            <p className="text-gray">CEO</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Email</Label>
            <p className="text-gray">lM5b6@example.com</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Phone</Label>
            <p className="text-gray">+1 234 567 89</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Work Phone</Label>
            <p className="text-gray">+1 234 567 89</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Fax</Label>
            <p className="text-gray">+1 234 567 89</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Website</Label>
            <p className="text-gray">www.example.com</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Keywords</Label>
            <p className="text-gray">keyword1, keyword2, keyword3, keyword4</p>
          </div>
        </div>
        <div>
          <div className="pb-4">
            <Label className="font-bold">Notes</Label>
            <p className="text-gray">
              lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Street</Label>
            <p className="text-gray">123 Main Street</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">City</Label>
            <p className="text-gray">New York</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Country</Label>
            <p className="text-gray">United States</p>
          </div>
          <div className="pb-4">
            <Label className="font-bold">Postal Code</Label>
            <p className="text-gray">12345</p>
          </div>
        </div>
      </section>
      <div className="flex justify-center px-8 pb-8">
        <Button className="bg-red h-14 px-8">
          <Save /> Save contact
        </Button>
      </div>
    </>
  );
};

export { AddContactFifthStep };

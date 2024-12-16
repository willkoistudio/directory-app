import { FC, useEffect, useState } from "react";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../../pages/add-contact/hooks/useAddContactForm";
import { Card } from "../../../ui/card";
import { Company } from "../../../../models/company";

interface AddContactFifthStepProps extends UseFormReturn<AddContactFormSchema> {
  companies: Company[];
  onSubmit: () => void;
}

const AddContactFifthStep: FC<AddContactFifthStepProps> = ({
  getValues,
  companies,
  onSubmit,
}) => {
  const [companyName, setCompanyName] = useState<string>("");

  const getCompanyName = () => {
    const company = companies.find(
      (company) => company.id === getValues("companyId")
    );
    setCompanyName(company?.name ?? "");
  };

  useEffect(() => {
    getCompanyName();
  }, [companies]);

  return (
    <>
      <p className="text-2xl  mt-8">Summary</p>
      <div className="py-12 flex gap-8 flex-row">
        <div className="basis-1/4">
          <div
            className="h-[350px] w-[350px] bg-cover bg-center rounded-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${
                getValues("avatar") || "https://via.placeholder.com/350"
              })`,
            }}
          >
            <Label className="font-bold mb-2 block">Profile picture</Label>
          </div>
        </div>
        <Card className="px-8 py-8 basis-1/2">
          <div>
            <div className="pb-4">
              <Label className="font-bold">Name</Label>
              <p className="text-gray">{getValues("name") || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">Company</Label>
              <p className="text-gray">{companyName || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">Function</Label>
              <p className="text-gray">{getValues("function") || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">Email</Label>
              <p className="text-gray">{getValues("email") || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">Phone</Label>
              <p className="text-gray">{getValues("phone") || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">Work Phone</Label>
              <p className="text-gray">{getValues("workPhone") || "N/A"}</p>
            </div>

            <div className="pb-4">
              <Label className="font-bold">Fax</Label>
              <p className="text-gray">{getValues("fax") || "N/A"}</p>
            </div>
            <div>
              <Label className="font-bold">Website</Label>
              <p className="text-gray">{getValues("website") || "N/A"}</p>
            </div>
          </div>
        </Card>
        <Card className="px-8 py-8 basis-1/2">
          <div>
            <div className="pb-4">
              <Label className="font-bold">Keywords</Label>
              {getValues("keywords")?.length > 0 ? (
                <p className="flex gap-2">
                  {getValues("keywords").map((keyword, index) => (
                    <span
                      key={index}
                      className="text-xs bg-red px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="text-gray">N/A</p>
              )}
            </div>
            <div className="pb-4">
              <Label className="font-bold">Notes</Label>
              <p className="text-gray">{getValues("notes") || "N/A"}</p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">Street</Label>
              <p className="text-gray">
                {getValues("address.street") || "N/A"}
              </p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">City</Label>
              <p className="text-gray">
                {getValues("address.cityId") || "N/A"}
              </p>
            </div>
            <div className="pb-4">
              <Label className="font-bold">Country</Label>
              <p className="text-gray">
                {getValues("address.countryId") || "N/A"}
              </p>
            </div>
            <div>
              <Label className="font-bold">Postal Code</Label>
              <p className="text-gray">
                {getValues("address.postalCode") || "N/A"}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-center px-8 w-full">
        <Button className="bg-red hover:bg-red/90 h-14 px-8" onClick={onSubmit}>
          <Save /> Save contact
        </Button>
      </div>
    </>
  );
};

export { AddContactFifthStep };

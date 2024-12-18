import { ChangeEvent, FC, useState } from "react";
import { Card } from "../../../ui/card";
import { CircleX, ImageUp } from "lucide-react";
import { Input } from "../../../ui/input";
import { UseFormReturn } from "react-hook-form";
import { AddCompanyFormSchema } from "../../../../pages/add-company/hooks/useAddCompanyForm";
import { t } from "i18next";

const AddCompanyFirstStep: FC<UseFormReturn<AddCompanyFormSchema>> = ({
  getValues,
  setValue,
  trigger,
  formState: { errors },
  clearErrors,
}) => {
  const [logo, setLogo] = useState<string>(getValues("logo"));

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setValue("logoFile", file);

    const isValid = await trigger("logoFile"); // Vérifier les erreurs pour avatarFile
    if (!isValid) {
      return;
    }

    setValue("logo", URL.createObjectURL(file));
    setLogo(URL.createObjectURL(file));
    clearErrors("logoFile");
  };

  const removeFileHandler = () => {
    setValue("logo", "");
    setValue("logoFile", undefined);
    setLogo("https://via.placeholder.com/350");
    trigger("logo");
  };
  return (
    <>
      <section className="pb-12 px-8">
        <Card className="border-0 relative w-[350px] mx-auto mb-12 mt-12">
          <CircleX
            className="absolute top-4 right-4 cursor-pointer"
            onClick={removeFileHandler}
          />
          {getValues("logo") ? (
            <img
              src={logo}
              alt="image"
              width={350}
              className="mx-auto rounded-lg"
            />
          ) : (
            <img
              src="https://via.placeholder.com/350"
              alt="image"
              width={350}
              className="mx-auto rounded-lg"
            />
          )}
        </Card>
        <Card className="text-center border-2 border-dashed py-12 px-8 w-1/2 mx-auto relative">
          <ImageUp className="mx-auto h-12 w-12" />
          <p className="text-xl my-4 font-bold">
            {t("addCompany.step1.importLogo")}{" "}
            <span className="text-red">*</span>
          </p>
          <p className="text-gray">{t("addCompany.step1.maximumFileSize")}</p>
          <p className="text-gray">{t("addCompany.step1.supportedFormats")}</p>
          {errors.logoFile && (
            <p className="text-red mt-6 text-sm">{errors.logoFile.message}</p>
          )}
          <Input
            id="logo"
            type="file"
            className="border-0 mx-auto absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </Card>
      </section>
    </>
  );
};

export { AddCompanyFirstStep };

import { ChangeEvent, FC, useState } from "react";
import { Card } from "../../../ui/card";
import { CircleX, ImageUp } from "lucide-react";
import { Input } from "../../../ui/input";
import { UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../../pages/add-contact/hooks/useAddContactForm";

const AddContactFirstStep: FC<UseFormReturn<AddContactFormSchema>> = ({
  getValues,
  setValue,
  trigger,
  formState: { errors },
  clearErrors,
}) => {
  const [avatar, setAvatar] = useState<string>(getValues("avatar"));

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setValue("avatarFile", file);

    const isValid = await trigger("avatarFile"); // Vérifier les erreurs pour avatarFile
    if (!isValid) {
      return;
    }

    setValue("avatar", URL.createObjectURL(file));
    setAvatar(URL.createObjectURL(file));
    clearErrors("avatarFile");
  };

  const removeFileHandler = () => {
    setValue("avatar", "");
    setValue("avatarFile", undefined);
    setAvatar("https://via.placeholder.com/350");
  };

  return (
    <>
      <section className="pb-12 mt-12">
        <Card className="border-0 relative mb-12 w-[350px] mx-auto">
          <CircleX
            className="absolute top-4 right-4 cursor-pointer"
            onClick={removeFileHandler}
          />
          {getValues("avatar") ? (
            <img
              src={avatar}
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
        <Card className="text-center border-2 border-dashed py-12 px-8 w-1/2 relative mx-auto">
          <ImageUp className="mx-auto h-12 w-12" />
          <p className="text-xl my-4 font-bold">Import a profile picture</p>
          <p className="text-gray">Maximum file size: 10MB</p>
          <p className="text-gray">Supported formats: .jpg, .jpeg, .png</p>
          {errors.avatarFile && (
            <p className="text-red mt-6 text-sm">{errors.avatarFile.message}</p>
          )}
          <Input
            id="picture"
            type="file"
            className="border-0 mx-auto absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </Card>
      </section>
    </>
  );
};

export { AddContactFirstStep };

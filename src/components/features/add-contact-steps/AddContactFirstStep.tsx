import { FC } from "react";
import { Card } from "../../../components/ui/card";
import { CircleX, ImageUp } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useParams } from "react-router-dom"; // Ajout de l'importation

const AddContactFirstStep: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <section className="pb-12 mt-12">
        <Card className="border-0 relative mb-12 w-[350px] mx-auto">
          <CircleX className="absolute top-4 right-4 cursor-pointer" />
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="image"
            width={350}
            className="mx-auto rounded-lg"
          />
        </Card>
        <Card className="text-center border-2 border-dashed py-12 px-8 w-1/2 relative mx-auto">
          <ImageUp className="mx-auto h-12 w-12" />
          <p className="text-xl my-4 font-bold">Import a profile picture</p>
          <p className="text-gray">Maximum file size: 10MB</p>
          <p className="text-gray">Supported formats: .jpg, .jpeg, .png</p>
          <Input
            id="picture"
            type="file"
            className="border-0 mx-auto absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          />
        </Card>
      </section>
    </>
  );
};

export { AddContactFirstStep };

import { FC } from "react";
import { Card } from "../../components/ui/card";
import { CircleX, ImageUp } from "lucide-react";
import { Input } from "../../components/ui/input";

const AddContactFirstStep: FC = () => {
  return (
    <>
      <p className="text-center pt-8 pb-8">
        Upload a profile picture for your contact
      </p>
      <section className="flex gap-12 pb-12 px-8">
        <Card className="text-center border-2 border-dashed py-12 px-8 w-full relative">
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
        <Card className="border-0 relative">
          <CircleX className="absolute top-4 right-4 cursor-pointer" />
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="image"
            width={350}
            className="mx-auto rounded-lg"
          />
        </Card>
      </section>
    </>
  );
};

export { AddContactFirstStep };

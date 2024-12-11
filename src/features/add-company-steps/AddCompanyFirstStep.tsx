import { FC } from "react";
import { Card } from "../../components/ui/card";
import { CircleX, ImageUp } from "lucide-react";
import { Input } from "../../components/ui/input";

const AddCompanyFirstStep: FC = () => {
  return (
    <>
      <section className="pb-12 px-8">
        <Card className="border-0 relative w-[350px] mx-auto mb-12 mt-12">
          <CircleX className="absolute top-4 right-4 cursor-pointer" />
          <img
            src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.png"
            alt="image"
            width={350}
            className="mx-auto rounded-lg"
          />
        </Card>
        <Card className="text-center border-2 border-dashed py-12 px-8 w-full relative">
          <ImageUp className="mx-auto h-12 w-12" />
          <p className="text-xl my-4 font-bold">Import a logo</p>
          <p className="text-gray">Maximum file size: 10MB</p>
          <p className="text-gray">Supported formats: .jpg, .jpeg, .png</p>
          <Input
            id="logo-company"
            type="file"
            className="border-0 mx-auto absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          />
        </Card>
      </section>
    </>
  );
};

export { AddCompanyFirstStep };

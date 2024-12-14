import { FC, useState } from "react";
import { Input } from "../../../ui/input";
import { X } from "lucide-react";
import { Label } from "../../../ui/label";
import { UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../../pages/add-contact/hooks/useAddContactForm";

const AddContactFourthStep: FC<UseFormReturn<AddContactFormSchema>> = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Fonction pour gérer l'événement de la touche
    if (event.key === "Enter") {
      setKeywords([...keywords, inputValue]);
      setInputValue(""); // Réinitialisation de l'input
    }
  };
  return (
    <>
      <section>
        <div className="mt-12 w-1/2 mx-auto">
          <Label className="block pb-4">
            Add some keywords to your contact
          </Label>

          <Input
            type="text"
            className=" h-14"
            placeholder="Add a keyword and press enter"
            value={inputValue} // Liaison de la valeur de l'input
            onChange={(e) => setInputValue(e.target.value)} // Mise à jour de l'état de l'input
            onKeyDown={handleKeyDown} // Ajout de l'événement de la touche
          />
          <div className="flex flex-wrap justify-center mt-8 ">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className="bg-red px-4 py-2 rounded-lg mx-2 mb-4 relative group"
              >
                <span
                  className="absolute -top-2 -right-3 cursor-pointer bg-white rounded-full px-1.5 opacity-0 group-hover:opacity-100"
                  onClick={() =>
                    setKeywords(keywords.filter((_, i) => i !== index))
                  }
                >
                  <X width={12} className="text-red" />
                </span>
                {keyword}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export { AddContactFourthStep };

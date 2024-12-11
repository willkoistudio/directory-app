import { FC, useState } from "react";
import { Input } from "../../components/ui/input";
import { X } from "lucide-react";

const AddContactFourthStep: FC = () => {
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
      <p className="text-center pt-8 pb-8">Add some keywords to your contact</p>
      <section>
        <div className="flex mb-8">
          <Input
            type="text"
            className="w-1/2 mx-auto h-14"
            placeholder="Add a keyword and press enter"
            value={inputValue} // Liaison de la valeur de l'input
            onChange={(e) => setInputValue(e.target.value)} // Mise à jour de l'état de l'input
            onKeyDown={handleKeyDown} // Ajout de l'événement de la touche
          />
        </div>
        <div className="flex flex-wrap justify-center ">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="bg-red px-4 py-2 rounded-lg mx-2 mb-2 relative"
            >
              <span
                className="absolute -top-2 -right-3 cursor-pointer bg-white rounded-full px-1.5"
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
      </section>
    </>
  );
};

export { AddContactFourthStep };

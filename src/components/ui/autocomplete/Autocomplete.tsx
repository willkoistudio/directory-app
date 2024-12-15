import { useState, useEffect } from "react";

import { AutoCompleteItem } from "./AutoComplete.def";
import { Input } from "../../ui/input";

interface AutocompleteProps {
  options: AutoCompleteItem[];
  value: string;
  onChange: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    updateQuery(value);
  }, []);

  const updateQuery = (optionValue: string) => {
    const valueQuery =
      options.find((option) => option.value === optionValue)?.label ?? "";

    if (valueQuery && valueQuery !== query) {
      setQuery(valueQuery);
    }
  };
  const filteredOptions = options.filter((option) => {
    if (!query) return [];
    return option.label.toLowerCase().includes(query.toLowerCase());
  });

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    updateQuery(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <div className="absolute top-10 dark:bg-black  max-h-60 overflow-y-auto w-full py-4 z-50 rounded-b-lg">
          {filteredOptions.length === 0 ? (
            <div className="text-center">No options found</div>
          ) : (
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-1 cursor-pointer hover:dark:bg-white/10"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;

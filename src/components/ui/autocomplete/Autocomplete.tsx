import { useState, useEffect, useRef } from "react";
import { AutoCompleteItem } from "./AutoComplete.def";
import { Input } from "../../ui/input";

interface AutocompleteProps {
  options: AutoCompleteItem[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update query when value or options change
  useEffect(() => {
    if (value && options.length > 0) {
      const found = options.find((option) => option.value === value);
      if (found) {
        setQuery(found.label);
      }
    }
  }, [value, options]);

  const filteredOptions = options.filter((option) => {
    if (!query) return [];
    return option.label.toLowerCase().includes(query.toLowerCase());
  });

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    const found = options.find((option) => option.value === optionValue);
    if (found) {
      setQuery(found.label);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <Input
        type="text"
        placeholder="Search..."
        disabled={disabled}
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
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

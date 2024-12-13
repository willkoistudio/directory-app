import { useMemo, useState } from "react";
import { Languages, Settings } from "lucide-react";
import { DropdownMenuItem } from "../../../ui/dropdown-menu";
import { LANGUAGES_APP } from "../../../../helpers/const/locale";
import i18n from "../../../../i18n";

const useDropdownMenuElements = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };
  return useMemo(
    () => [
      {
        label: "Languages",
        icon: <Languages className="cursor-pointer hover:text-gray " />,
        content: LANGUAGES_APP.map((lang) => (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-white/5"
            onClick={() => changeLanguage(lang.locale)}
            key={lang.code}
            disabled={lang.locale === currentLanguage}
          >
            {lang.name}
          </DropdownMenuItem>
        )),
      },
      {
        label: "Settings",
        icon: <Settings className="cursor-pointer hover:text-gray " />,
        content: (
          <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
            Logout
          </DropdownMenuItem>
        ),
      },
    ],
    [currentLanguage, changeLanguage]
  );
};

export default useDropdownMenuElements;

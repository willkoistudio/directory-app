import React, { useEffect, useState } from "react";
import { NavigationMenu } from "../../../components/ui/navigation-menu";
import { Languages, Settings } from "lucide-react";
import { usePageName } from "../../../context/PageNameContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import i18n from "i18next";
import { LANGUAGES_APP } from "../../../helpers/const/locale";

const Header: React.FC = () => {
  const { pageName } = usePageName();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    console.log("lang", currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    console.log("lang", lang);
  };

  return (
    <header className="w-full h-14 px-8 flex items-center border-b border-border/70">
      <NavigationMenu className="flex w-full justify-between">
        <span>{pageName}</span>
        <div className="flex gap-6 ml-auto mr-0">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Languages className="cursor-pointer hover:text-gray " />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white/10">
              <DropdownMenuLabel className="border-white/10 border-b">
                Languages
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGUAGES_APP.map((lang) => (
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-white/5"
                  onClick={() => changeLanguage(lang.locale)}
                  key={lang.code}
                  disabled={lang.locale === currentLanguage}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings className="cursor-pointer hover:text-gray" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white/10">
              <DropdownMenuLabel className="border-white/10 border-b">
                Settings
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </NavigationMenu>
    </header>
  );
};

export { Header };

/** @format */

import { useMemo, useState } from "react";
import { Languages, LogOut, Settings, SunMoon } from "lucide-react";
import { DropdownMenuItem } from "../../../ui/dropdown-menu";
import { LANGUAGES_APP } from "../../../../const/locale";
import i18n from "../../../../i18n";
import { APP_THEME } from "../../../../const/theme";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../store/store";
import { logout } from "../../../../store/authSlice";
import { useNavigate } from "react-router-dom";

const useDropdownMenuElements = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return (savedTheme as APP_THEME) || APP_THEME.DARK;
  });
  const themes = [APP_THEME.LIGHT, APP_THEME.DARK];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  const changeTheme = (theme: APP_THEME) => {
    if (theme === APP_THEME.LIGHT) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setCurrentTheme(APP_THEME.LIGHT);
      localStorage.setItem("app-theme", APP_THEME.LIGHT);
      return;
    }
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    setCurrentTheme(APP_THEME.DARK);
    localStorage.setItem("app-theme", APP_THEME.DARK);
  };

  return useMemo(
    () => [
      {
        label: "Theme",
        icon: <SunMoon className="cursor-pointer hover:text-gray " />,
        content: themes.map((theme) => (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-white/5"
            onClick={() => changeTheme(theme)}
            key={theme}
            disabled={theme === currentTheme}
          >
            {theme}
          </DropdownMenuItem>
        )),
      },
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
        label: "Logout",
        icon: <LogOut className="cursor-pointer hover:text-gray " />,
        content: (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-white/5"
            onClick={async () => {
              await dispatch(logout());
              navigate("/login");
            }}
          >
            {t("login.logout")}
          </DropdownMenuItem>
        ),
      },
    ],
    [currentLanguage, currentTheme, dispatch, navigate],
  );
};

export default useDropdownMenuElements;

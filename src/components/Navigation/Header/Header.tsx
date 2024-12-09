import React from "react";
import { NavigationMenu } from "../../../components/ui/navigation-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faLanguage,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

const appName = "Directory App";
const Header: React.FC = () => {
  return (
    <header className="w-full bg-black h-14 px-4 flex items-center">
      <NavigationMenu className="flex w-full justify-between text-white">
        <div className="flex gap-4 items-center">
          <a href="#" className={styles.header__logo}>
            {appName}
          </a>
          <span className="text-white mr-auto">{appName}</span>
        </div>
        <div className="flex gap-4 ml-auto mr-0">
          <FontAwesomeIcon icon={faLanguage} />
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faUserGear} />
        </div>
      </NavigationMenu>
    </header>
  );
};

export { Header };

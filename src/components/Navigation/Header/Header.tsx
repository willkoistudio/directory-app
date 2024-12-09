import React from "react";
import { NavigationMenu } from "../../../components/ui/navigation-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faLanguage,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <header className="w-full h-14 px-4 flex items-center">
      <NavigationMenu className="flex w-full justify-between">
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

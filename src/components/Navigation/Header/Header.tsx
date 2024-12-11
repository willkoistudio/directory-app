import React from "react";
import { NavigationMenu } from "../../../components/ui/navigation-menu";
import { Languages, BellDot, Settings } from "lucide-react";
import { usePageName } from "../../../context/PageNameContext";

const Header: React.FC = () => {
  const { pageName } = usePageName();
  return (
    <header className="w-full h-14 px-8 flex items-center border-b border-border/70">
      <NavigationMenu className="flex w-full justify-between">
        <span>{pageName}</span>
        <div className="flex gap-6 ml-auto mr-0">
          <Languages className="cursor-pointer" />
          <BellDot className="cursor-pointer" />
          <Settings className="cursor-pointer" />
        </div>
      </NavigationMenu>
    </header>
  );
};

export { Header };

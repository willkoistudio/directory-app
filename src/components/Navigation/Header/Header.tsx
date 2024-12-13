import { FC } from "react";
import { NavigationMenu } from "../../../components/ui/navigation-menu";
import { usePageName } from "../../../context/PageNameContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import useDropdownMenuElements from "./hooks/useDropdownMenuElements";

const Header: FC = () => {
  const { pageName } = usePageName();
  const dropdownMenuElements = useDropdownMenuElements();

  return (
    <header className="w-full h-14 px-8 flex items-center border-b border-border/70">
      <NavigationMenu className="flex w-full justify-between">
        <span>{pageName}</span>
        <div className="flex gap-6 ml-auto mr-0">
          {dropdownMenuElements.map((element, index) => (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger>{element.icon}</DropdownMenuTrigger>
              <DropdownMenuContent className="border-white/10">
                <DropdownMenuLabel className="border-white/10 border-b">
                  {element.label}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {element.content}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </NavigationMenu>
    </header>
  );
};

export { Header };

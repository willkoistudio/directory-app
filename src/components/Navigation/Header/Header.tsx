import React from "react";
import { NavigationMenu } from "../../../components/ui/navigation-menu";
import { Languages, BellDot, Settings } from "lucide-react";
import { usePageName } from "../../../context/PageNameContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const Header: React.FC = () => {
  const { pageName } = usePageName();
  return (
    <header className="w-full h-14 px-8 flex items-center border-b border-border/70">
      <NavigationMenu className="flex w-full justify-between">
        <span>{pageName}</span>
        <div className="flex gap-6 ml-auto mr-0">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Languages className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white/10">
              <DropdownMenuLabel className="border-white/10 border-b">
                Languages
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                Français
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BellDot className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white/10">
              <DropdownMenuLabel className="border-white/10 border-b">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                <span className="bg-red w-2 h-2 rounded-full"></span>
                Vous avez recu 1 nouvelle notification
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white/10">
              <DropdownMenuLabel className="border-white/10 border-b">
                Settings
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
                Profile
              </DropdownMenuItem>
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

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import { Home, Search, UserRoundPlus, HousePlus } from "lucide-react";
import styles from "./Sidebar.module.scss";
import { ROUTE_NAMES } from "../../../helpers/const/routes";
import { usePageName } from "../../../context/PageNameContext";

const items = [
  {
    title: ROUTE_NAMES.HOME,
    url: "/",
    icon: Home,
  },
  {
    title: ROUTE_NAMES.SEARCH,
    url: "/search",
    icon: Search,
  },
  {
    title: ROUTE_NAMES.ADD_CONTACT,
    url: "/add-contact",
    icon: UserRoundPlus,
  },
  {
    title: ROUTE_NAMES.ADD_COMPANY,
    url: "/add-company",
    icon: HousePlus,
  },
];

const appName = "Directory App";

const AppSidebar: React.FC = () => {
  const { pageName } = usePageName();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <a href="#" className={styles.header__logo}>
              {appName}
            </a>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.title === pageName}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };

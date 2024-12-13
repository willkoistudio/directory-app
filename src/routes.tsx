import { Home } from "./pages/home/Home";
import { AddCompany } from "./pages/add-company/AddCompany";
import { AddContact } from "./pages/add-contact/AddContact";
import { ContactDetail } from "./pages/contact-detail/ContactDetail";
import { NotFound } from "./pages/not-found/NotFound";
import { Search } from "./pages/search/Search";
import { CompanyDetail } from "./pages/company-detail/CompanyDetail";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-contact",
    element: <AddContact />,
  },
  {
    path: "/edit-contact/:id",
    element: <AddContact />,
  },
  {
    path: "/contact/:id",
    element: <ContactDetail />,
  },
  {
    path: "/add-company",
    element: <AddCompany />,
  },
  {
    path: "/edit-company/:id",
    element: <AddCompany />,
  },
  {
    path: "/company/:id",
    element: <CompanyDetail />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

import React, { useEffect } from "react";
import { Header } from "./components/navigation/header/Header";
import { AppSidebar } from "./components/navigation/Sidebar/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { AddCompany } from "./pages/add-company/AddCompany";
import { AddContact } from "./pages/add-contact/AddContact";
import { ContactDetail } from "./pages/contact-detail/ContactDetail";
import { NotFound } from "./pages/not-found/NotFound";
import { Search } from "./pages/search/Search";
import { PageNameProvider } from "./context/PageNameContext"; // Importer le provider
import { CompanyDetail } from "./pages/company-detail/CompanyDetail";

const App: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  return (
    <SidebarProvider>
      <PageNameProvider>
        <AppSidebar />
        <div className="w-full ">
          <Header />
          <main className="container mx-auto h-full">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-contact" element={<AddContact />} />
                <Route path="/edit-contact/:id" element={<AddContact />} />
                <Route path="/contact/:id" element={<ContactDetail />} />
                <Route path="/add-company" element={<AddCompany />} />
                <Route path="/edit-company/:id" element={<AddCompany />} />
                <Route path="/company/:id" element={<CompanyDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      </PageNameProvider>
    </SidebarProvider>
  );
};

export default App;

import React, { useEffect } from "react";
import { Header } from "./components/navigation/header/Header";
import { AppSidebar } from "./components/navigation/Sidebar/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";

const App: React.FC = () => {
  useEffect(() => {
    // Ajoute la classe 'dark' par défaut
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <SidebarProvider className="bg-background/95">
      <AppSidebar />
      <div className="w-full ">
        <Header />
        <main>Allo</main>
      </div>
    </SidebarProvider>
  );
};

export default App;

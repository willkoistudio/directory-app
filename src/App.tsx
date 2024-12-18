import React, { useEffect, useState } from "react";
import { Header } from "./components/navigation/header/Header";
import { AppSidebar } from "./components/navigation/Sidebar/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { PageNameProvider } from "./context/PageNameContext"; // Importer le provider
import { routes } from "./routes";
import "./assets/global.scss";
import { CscProvider } from "./context/CountryStateCityContext";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/auth/Login";

const App: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  const routeName = window.location.pathname;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (routeName === "/login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [routeName]);

  return (
    <>
      {isLogin ? (
        <PageNameProvider>
          <main className="w-full mx-auto">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </main>
          <Toaster />
        </PageNameProvider>
      ) : (
        <SidebarProvider>
          <PageNameProvider>
            <CscProvider>
              <AppSidebar />
              <div className="w-full">
                <Header />
                <main className="container mx-auto main-app-container">
                  <BrowserRouter>
                    <Routes>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                    </Routes>
                  </BrowserRouter>
                </main>
                <Toaster />
              </div>
            </CscProvider>
          </PageNameProvider>
        </SidebarProvider>
      )}
    </>
  );
};

export default App;

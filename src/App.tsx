/** @format */

import React, { useEffect } from "react";
import { Header } from "./components/Navigation/Header/Header";
import { AppSidebar } from "./components/Navigation/Sidebar/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { PageNameProvider } from "./context/PageNameContext";
import { routes } from "./routes";
import "./assets/global.scss";
import { CscProvider } from "./context/CountryStateCityContext";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthCallback from "./pages/auth/AuthCallback";
import { useAppSelector } from "./store/store";

// Composant pour protéger les routes
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppContent: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isAuthCallbackPage = location.pathname === "/auth/callback";

  // Si l'utilisateur est déjà connecté et essaie d'accéder à /login ou /signup, rediriger vers la home
  if (isLoggedIn && (isLoginPage || isSignupPage)) {
    return <Navigate to="/" replace />;
  }

  // Si c'est la page de login, signup ou callback, afficher uniquement la page d'authentification
  if (isLoginPage || isSignupPage || isAuthCallbackPage) {
    return (
      <PageNameProvider>
        <main className="w-full mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </main>
        <Toaster />
      </PageNameProvider>
    );
  }

  // Pour les autres routes, vérifier l'authentification
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <PageNameProvider>
          <CscProvider>
            <AppSidebar />
            <div className="w-full">
              <Header />
              <main className="container mx-auto main-app-container">
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </main>
              <Toaster />
            </div>
          </CscProvider>
        </PageNameProvider>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

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
import { useAppSelector, useAppDispatch } from "./store/store";
import { restoreSession } from "./store/authSlice";

// Composant pour protéger les routes
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  console.log("🛡️ ProtectedRoute - isLoggedIn:", isLoggedIn);
  console.log("🛡️ ProtectedRoute - token:", token ? "présent" : "absent");
  console.log("🛡️ ProtectedRoute - location:", location.pathname);

  if (!isLoggedIn) {
    console.log("❌ ProtectedRoute - Redirection vers /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("✅ ProtectedRoute - Accès autorisé");
  return children;
};

const AppContent: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.loggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isAuthCallbackPage = location.pathname === "/auth/callback";

  console.log("📱 AppContent - isLoggedIn:", isLoggedIn);
  console.log("📱 AppContent - token:", token ? "présent" : "absent");
  console.log("📱 AppContent - pathname:", location.pathname);
  console.log("📱 AppContent - isLoginPage:", isLoginPage);
  console.log("📱 AppContent - isSignupPage:", isSignupPage);
  console.log("📱 AppContent - isAuthCallbackPage:", isAuthCallbackPage);

  // Si l'utilisateur est déjà connecté et essaie d'accéder à /login ou /signup, rediriger vers la home
  if (isLoggedIn && (isLoginPage || isSignupPage)) {
    console.log("🔄 AppContent - Utilisateur connecté, redirection vers /");
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
            <div className="w-full flex flex-col">
              <Header />
              <main className="main-app-container p-6 flex-1 flex flex-col">
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Charger le thème sauvegardé ou utiliser dark par défaut
    const savedTheme = localStorage.getItem("app-theme") || "dark";
    document.body.classList.add(savedTheme);

    // Restaurer la session au démarrage si un token existe
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

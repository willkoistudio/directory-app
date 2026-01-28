/** @format */

import { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setToken } from "../../store/authSlice";
import { toast } from "../../hooks/use-toast";
import { t } from "i18next";

const AuthCallback: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      console.log("🔵 AuthCallback - Début du traitement");
      console.log("🔵 Location:", location);
      console.log("🔵 Hash:", location.hash);
      console.log("🔵 Search:", location.search);
      console.log("🔵 Full URL:", window.location.href);

      try {
        // Supabase place le token dans le hash (#access_token=...)
        // ou dans les query params (?code=...)
        const hash = location.hash.substring(1); // Enlever le #
        const params = new URLSearchParams(hash);
        const queryParams = new URLSearchParams(location.search);

        console.log("🔵 Hash string:", hash);
        console.log("🔵 Hash params:", Object.fromEntries(params.entries()));
        console.log(
          "🔵 Query params:",
          Object.fromEntries(queryParams.entries()),
        );

        const accessToken =
          params.get("access_token") ||
          queryParams.get("access_token") ||
          queryParams.get("token");
        const refreshToken =
          params.get("refresh_token") || queryParams.get("refresh_token");
        const error = params.get("error") || queryParams.get("error");
        const errorDescription =
          params.get("error_description") ||
          queryParams.get("error_description");

        console.log(
          "🔵 Access Token:",
          accessToken ? `${accessToken.substring(0, 20)}...` : "null",
        );
        console.log("🔵 Refresh Token:", refreshToken ? "présent" : "absent");
        console.log("🔵 Error:", error);
        console.log("🔵 Error Description:", errorDescription);

        if (error) {
          console.error("❌ Erreur dans le callback:", error, errorDescription);
          toast({
            variant: "destructive",
            title: t("login.error"),
            description: errorDescription || error,
          });
          navigate("/login");
          return;
        }

        if (accessToken) {
          console.log("✅ Token trouvé, stockage en cours...");

          // Stocker le token dans localStorage
          localStorage.setItem("auth_token", accessToken);
          console.log("✅ Token stocké dans localStorage");

          if (refreshToken) {
            localStorage.setItem("auth_refresh_token", refreshToken);
            console.log("✅ Refresh token stocké");
          }

          // Mettre à jour le store Redux avec le token
          console.log("✅ Mise à jour du store Redux...");
          dispatch(setToken(accessToken));
          console.log("✅ Store Redux mis à jour");

          // Vérifier l'état après la mise à jour
          setTimeout(() => {
            const storedToken = localStorage.getItem("auth_token");
            console.log(
              "🔍 Token dans localStorage après dispatch:",
              storedToken ? "présent" : "absent",
            );
            console.log("🔍 Redirection vers /...");
          }, 100);

          toast({
            title: t("login.success"),
            description: t("login.successDescription"),
          });

          // Rediriger vers la page d'accueil
          console.log("🔄 Navigation vers /...");
          navigate("/", { replace: true });
        } else {
          // Pas de token, rediriger vers login
          console.error("❌ Aucun token trouvé dans l'URL");
          console.log("❌ Hash:", hash);
          console.log("❌ Search:", location.search);
          toast({
            variant: "destructive",
            title: t("login.error"),
            description: "No access token received",
          });
          navigate("/login");
        }
      } catch (error) {
        console.error("❌ Erreur dans handleCallback:", error);
        toast({
          variant: "destructive",
          title: t("login.error"),
          description: t("login.errorDescription"),
        });
        navigate("/login");
      }
    };

    handleCallback();
  }, [location, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{t("login.loading")}</h1>
        <p>{t("login.processing")}</p>
      </div>
    </div>
  );
};

export default AuthCallback;

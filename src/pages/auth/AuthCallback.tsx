/** @format */

import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { login } from "../../store/authSlice";
import { toast } from "../../hooks/use-toast";
import { t } from "i18next";

const AuthCallback: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      // Récupérer les paramètres de l'URL (code, access_token, etc.)
      const code = searchParams.get("code");
      const accessToken = searchParams.get("access_token");
      const error = searchParams.get("error");

      if (error) {
        toast({
          variant: "destructive",
          title: t("login.error"),
          description: error,
        });
        navigate("/login");
        return;
      }

      // Si on a un code ou un token, l'authentification a réussi
      // Dans un vrai scénario, vous devriez échanger le code contre un token
      // Pour l'instant, on simule une connexion réussie
      if (code || accessToken) {
        toast({
          title: t("login.success"),
          description: t("login.successDescription"),
        });
        // Rediriger vers la page d'accueil
        navigate("/");
      } else {
        // Pas de paramètres, rediriger vers login
        navigate("/login");
      }
    };

    handleCallback();
  }, [searchParams, navigate, dispatch]);

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

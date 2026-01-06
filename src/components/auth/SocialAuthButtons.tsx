/** @format */

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { IS_API_MOCKED } from "../../const/common";
import { ServiceAuthMock } from "../../services/auth/auth.service.mock";
import { ServiceAuthHttp } from "../../services/auth/auth.service.http";
import { toast } from "../../hooks/use-toast";
import { t } from "i18next";
import { useAppDispatch } from "../../store/store";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const serviceAuth = IS_API_MOCKED
  ? new ServiceAuthMock()
  : new ServiceAuthHttp();

interface SocialAuthButtonsProps {
  onSuccess?: () => void;
}

export const SocialAuthButtons: FC<SocialAuthButtonsProps> = ({
  onSuccess,
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSocialLogin = async (
    provider: "google" | "github" | "facebook"
  ) => {
    try {
      setLoading(provider);
      const { url } = await serviceAuth.getSocialAuthUrl(provider);

      if (IS_API_MOCKED) {
        // En mode mock, simuler une connexion réussie via Redux
        // On crée un faux login pour mettre à jour le store
        try {
          const mockLoginResult = await dispatch(
            login({
              email: `${provider}@example.com`,
              password: "mock_password",
            }) as any
          );

          if (login.fulfilled.match(mockLoginResult)) {
            toast({
              title: t("login.success"),
              description: t("login.successDescription"),
            });
            navigate("/");
            onSuccess?.();
          } else if (login.rejected.match(mockLoginResult)) {
            toast({
              variant: "destructive",
              title: t("login.error"),
              description: t("login.errorDescription"),
            });
          }
        } catch (error) {
          console.error("Error in mock social login:", error);
          toast({
            variant: "destructive",
            title: t("login.error"),
            description: t("login.errorDescription"),
          });
        }
      } else {
        // Rediriger vers l'URL d'authentification
        window.location.href = url;
      }
    } catch (error: any) {
      console.error(`Error with ${provider} auth:`, error);

      // Vérifier si c'est une erreur de provider non activé
      const errorMessage =
        error?.response?.data?.msg || error?.message || error?.toString();
      const isProviderNotEnabled =
        errorMessage?.includes("provider is not enabled") ||
        errorMessage?.includes("Unsupported provider");

      const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
      toast({
        variant: "destructive",
        title: t("login.error"),
        description: isProviderNotEnabled
          ? t("login.providerNotEnabled", { provider: providerName })
          : t("login.errorDescription"),
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("login.orContinueWith")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("google")}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === "google" ? (
            t("login.loading")
          ) : (
            <span className="text-sm">Google</span>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("github")}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === "github" ? (
            t("login.loading")
          ) : (
            <span className="text-sm">GitHub</span>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin("facebook")}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === "facebook" ? (
            t("login.loading")
          ) : (
            <span className="text-sm">Facebook</span>
          )}
        </Button>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../const/routes";
import { Button } from "../../components/ui/button";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const { setPageName } = usePageName();
  const { t } = useTranslation();

  useEffect(() => {
    setPageName(ROUTE_NAMES.NOT_FOUND); // Mettre à jour le nom de la page
  }, []);
  return (
    <div className="text-center h-full flex">
      <div className="my-auto mx-auto">
        <h1 className="text-9xl font-bold ">{t("notFound.title")}</h1>
        <p>{t("notFound.description")}</p>
        <div className="flex">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-red mx-auto mt-12"
          >
            {t("notFound.backToHome")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { NotFound };

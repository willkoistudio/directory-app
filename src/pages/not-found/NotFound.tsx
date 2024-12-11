import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../helpers/const/routes";

const NotFound: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName(ROUTE_NAMES.NOT_FOUND); // Mettre à jour le nom de la page
  }, []);
  return <h1>Page not found</h1>;
};

export { NotFound };

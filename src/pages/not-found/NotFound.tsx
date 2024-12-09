import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";

const NotFound: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName("Home"); // Mettre à jour le nom de la page
  }, [setPageName]);
  return <h1>Page not found</h1>;
};

export { NotFound };

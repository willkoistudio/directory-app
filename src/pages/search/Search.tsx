import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";

const Search: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName("Search"); // Mettre à jour le nom de la page
  }, [setPageName]);

  return <h1>Search page</h1>;
};

export { Search };

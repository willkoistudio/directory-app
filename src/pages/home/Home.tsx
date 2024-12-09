import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";

const Home: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName("Home"); // Mettre à jour le nom de la page
  }, [setPageName]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export { Home };

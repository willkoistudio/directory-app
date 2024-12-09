import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";

const ContactDetail: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName("Contact Detail"); // Mettre à jour le nom de la page
  }, [setPageName]);

  return (
    <div>
      <h1>ContactDetail</h1>
    </div>
  );
};

export { ContactDetail };

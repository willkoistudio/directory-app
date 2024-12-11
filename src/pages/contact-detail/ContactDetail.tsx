import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../helpers/const/routes";

const ContactDetail: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName(ROUTE_NAMES.CONTACT_DETAIL); // Mettre à jour le nom de la page
  }, []);

  return (
    <div>
      <h1>ContactDetail</h1>
    </div>
  );
};

export { ContactDetail };

import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { Card } from "../../components/ui/card";
import { Building2, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const contactDetail = {
  id: "3c23d152",
  name: "Will Smirs",
  companyId: "0",
  email: "shanna@yahoo.com",
  phone: "010-692-6593 x09125",
  workPhone: "1-463-123-3447",
  fax: "1-463-123-3447",
  function: "Chief Executive Officer",
  website: "www.hildegard.org",
  address: {
    street: "1 GNX Drive",
    city: "Oakland",
    postalCode: "12345",
    country: "Canada",
  },
  keywords: ["keyword1", "keyword2", "keyword3"],
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CompanyDetail: React.FC = () => {
  const { setPageName } = usePageName();
  const navigate = useNavigate();

  useEffect(() => {
    setPageName(ROUTE_NAMES.COMPANY_DETAIL); // Mettre à jour le nom de la page
  }, []);

  return (
    <>
      <section className="mt-12 grid grid-cols-2 gap-8"></section>
    </>
  );
};

export { CompanyDetail };

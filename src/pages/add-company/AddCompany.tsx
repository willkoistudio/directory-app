import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../helpers/const/routes";

const AddCompany: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName(ROUTE_NAMES.ADD_COMPANY); // Mettre à jour le nom de la page
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une entreprise</CardTitle>
      </CardHeader>
      <CardContent>{/* Contenu du formulaire */}</CardContent>
    </Card>
  );
};

export { AddCompany };

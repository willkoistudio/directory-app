import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { usePageName } from "../../context/PageNameContext";

const AddCompany: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName("Add Company"); // Mettre à jour le nom de la page
  }, [setPageName]);

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

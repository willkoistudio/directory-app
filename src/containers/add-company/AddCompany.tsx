import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const AddCompany: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une entreprise</CardTitle>
      </CardHeader>
      <CardContent>{/* Contenu du formulaire */}</CardContent>
    </Card>
  );
};

export default AddCompany;

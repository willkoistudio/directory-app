import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { usePageName } from "../../context/PageNameContext";

const AddContact: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName("Add Contact"); // Mettre à jour le nom de la page
  }, [setPageName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un contact</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Nom du contact" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email du contact" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" type="tel" placeholder="Téléphone du contact" />
          </div>
          <Button type="submit">Ajouter</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { AddContact };

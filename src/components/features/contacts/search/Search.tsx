import React from "react";
import { Input } from "../../../../components/ui/input";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";

const Search: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h2>Rechercher un contact</h2>
      </CardHeader>
      <CardContent>
        <Input type="search" placeholder="Rechercher..." className="w-full" />
      </CardContent>
    </Card>
  );
};

export default Search;

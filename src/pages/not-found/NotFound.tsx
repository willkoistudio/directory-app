import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { Button } from "../../components/ui/button";

const NotFound: React.FC = () => {
  const { setPageName } = usePageName();

  useEffect(() => {
    setPageName(ROUTE_NAMES.NOT_FOUND); // Mettre à jour le nom de la page
  }, []);
  return (
    <div className="text-center h-full flex">
      <div className="my-auto mx-auto">
        <h1 className="text-9xl font-bold ">404</h1>
        <p>The page you are looking for does not exist.</p>
        <p>Sorry for the inconvenience.</p>
        <div className="flex">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-red mx-auto mt-12"
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export { NotFound };

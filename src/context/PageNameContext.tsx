import React, { createContext, useContext, useState, ReactNode } from "react";
import { ROUTE_NAMES } from "../helpers/const/routes";

const PageNameContext = createContext<
  | { pageName: ROUTE_NAMES; setPageName: (name: ROUTE_NAMES) => void }
  | undefined
>(undefined);

export const PageNameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pageName, setPageName] = useState<ROUTE_NAMES>(ROUTE_NAMES.HOME); // État pour le nom de la page

  return (
    <PageNameContext.Provider value={{ pageName, setPageName }}>
      {children}
    </PageNameContext.Provider>
  );
};

export const usePageName = () => {
  const context = useContext(PageNameContext);
  if (!context) {
    throw new Error("usePageName must be used within a PageNameProvider");
  }
  return context;
};

import React from "react";
import { Header } from "./components/navigation/header/Header";
import { AppSidebar } from "./components/navigation/Sidebar/Sidebar";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-rows-2 gap-4">
        <AppSidebar />
        {"ok" /* <Content> */}
      </div>
    </div>
  );
};

export default App;

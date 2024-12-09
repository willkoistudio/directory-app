import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/main.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

useEffect(() => {
  document.body.classList.add("dark");
}, []);

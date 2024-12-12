import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/main.css";
import "./assets/override.scss";
import { Provider } from "react-redux"; // Ajouté
import store from "./store/store";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./frontend/App.tsx";
import "./frontend/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

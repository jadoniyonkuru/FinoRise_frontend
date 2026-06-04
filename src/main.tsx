import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { LearnerProgressProvider } from "./context/LearnerProgressContext";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./styles/dashboard-theme.css";
import "./styles/portal-cards-global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LearnerProgressProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LearnerProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

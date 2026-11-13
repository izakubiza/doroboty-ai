import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./features/prototype/app";
import { AppErrorBoundary } from "./features/prototype/error-boundary";
import "./app/globals.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);

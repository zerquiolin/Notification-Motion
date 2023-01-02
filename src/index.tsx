import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Providers
import NotificationProvider from "./Contexts/NotificationContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
);

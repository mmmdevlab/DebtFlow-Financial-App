import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DebtProvider } from "./context/DebtContext.jsx";
import { PaymentProvider } from "./context/PaymentContext.jsx";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <DebtProvider>
        <PaymentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PaymentProvider>
      </DebtProvider>
    </UserProvider>
  </StrictMode>,
);
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastProvider } from "react-toast-notifications";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <HelmetProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </HelmetProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>
);

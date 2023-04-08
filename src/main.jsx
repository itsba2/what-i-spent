// imports from libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// imports from files
import { store } from "./app/store";
import AuthRequired from "./auth/AuthRequired";
import { AuthProvider } from "./auth/AuthProvider";
import { ColorModeProvider } from "./styles/ColorModeProvider";

// page imports
import App from "./App";
import AppError from "./layout/AppError";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import Stats from "./pages/Stats";
import Account from "./pages/Account";
import ResetPassword from "./pages/ResetPassword";
import AddTransaction from "./pages/AddTransaction";

// router object
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <AppError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/transactions",
        element: (
          <AuthRequired>
            <Transactions />
          </AuthRequired>
        ),
      },
      {
        path: "/transactions/add",
        element: (
          <AuthRequired>
            <AddTransaction />
          </AuthRequired>
        ),
      },
      {
        path: "/stats",
        element: (
          <AuthRequired>
            <Stats />
          </AuthRequired>
        ),
      },
      {
        path: "/account",
        element: (
          <AuthRequired>
            <Account />
          </AuthRequired>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <AuthProvider>
        <ColorModeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ColorModeProvider>
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>
);

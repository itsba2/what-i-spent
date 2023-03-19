// imports from libraries
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider as StoreProvider } from "react-redux"

// imports from files
import "./index.css"
import { store } from "./app/store"
import AuthRequired from "./auth/AuthRequired"
import { AuthProvider } from "./auth/AuthProvider"

// page imports
import App from "./App"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import Register from "./pages/Register"
import Expenses from "./pages/Expenses"
import Stats from "./pages/Stats"
import Account from "./pages/Account"
import ResetPassword from "./pages/ResetPassword"
import AddExpense from "./pages/AddExpense"

// router object
const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
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
                path: "/expenses",
                element: (
                    <AuthRequired>
                        <Expenses />
                    </AuthRequired>
                ),
            },
            {
                path: "/add-expense",
                element: (
                    <AuthRequired>
                        <AddExpense />
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
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </StoreProvider>
    </React.StrictMode>
)

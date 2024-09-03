import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { logout } from "../../redux/authSlice";
import Login from "../Login/Login";
import ProductsList from "../ProductsList/ProductsList";
import Button from "../Button/Button";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

import "./App.css";

function App() {
    const { token } = useSelector((state) => state.auth); // токен из состояния
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/products",
            element: (
                <PrivateRoute>
                    <ProductsList />
                </PrivateRoute>
            ),
        },
        {
            path: "*",
            element: <Navigate to="/products" />,
        },
    ]);

    return (
        <div className="app-container">
            {token && (
                <div className="logout-button-container">
                    <Button onClick={handleLogout} variant="danger" size="medium">
                        Logout
                    </Button>
                </div>
            )}
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

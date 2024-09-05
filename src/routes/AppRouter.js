import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "../../src/components/Login/Login";
import ProductsList from "../../src/components/ProductsList/ProductsList";
import PrivateRoute from "../../src/components/PrivateRoute/PrivateRoute";

const AppRouter = ({ token }) => {
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
      element: <Navigate to={token ? "/products" : "/login"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;

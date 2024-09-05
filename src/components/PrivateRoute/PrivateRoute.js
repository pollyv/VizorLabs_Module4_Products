import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  // Если токен существует, рендерим дочерние компоненты, а если нет, то перенаправляем на страницу логина
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

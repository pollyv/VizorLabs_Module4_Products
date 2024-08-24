import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "./redux/authSlice";
import Login from "./components/Login/Login";
import ProductsList from "./components/ProductsList/ProductsList";

import "./App.css";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-container">
      {token && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={token ? <ProductsList /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/products" : "/login"} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

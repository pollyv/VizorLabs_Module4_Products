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

import "./App.css";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div>
        {token && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          {/* Маршрут для /login */}
          <Route path="/login" element={<Login />} />

          {/* Перенаправляем по умолчанию*/}
          <Route
            path="*"
            element={<Navigate to={token ? "/login" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

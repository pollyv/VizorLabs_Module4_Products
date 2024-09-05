import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/authSlice";
import Button from "../Button/Button";
import AppRouter from "../../routes/AppRouter";

import "./App.css";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-container">
      {token && (
        <div className="logout-button-container">
          <Button onClick={handleLogout} variant="danger" size="medium">
            Logout
          </Button>
        </div>
      )}
      <AppRouter token={token} />
    </div>
  );
};

export default App;

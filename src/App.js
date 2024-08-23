import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "./redux/authSlice";

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
          {/* Вместо /login */}
          <Route
            path="/login"
            element={
              <div>
                <h2>Login Page</h2>
                {/* Здесь будет компонент Login */}
              </div>
            }
          />
          {/* Вместо /products */}
          <Route
            path="/products"
            element={
              token ? (
                <div>
                  <h2>Products List</h2>
                  {/* Здесь будет компонент ProductsList */}
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Перенаправляем по умолчанию*/}
          <Route
            path="*"
            element={<Navigate to={token ? "/products" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

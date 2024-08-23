import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/authApi";
import { loginSuccess, loginFailure } from "../../redux/authSlice";

import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      const credentials = {
        username: data.username,
        password: data.password,
      };

      const result = await login(credentials);
      localStorage.setItem("token", result.token);
      dispatch(loginSuccess(result));
      navigate("/products");
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

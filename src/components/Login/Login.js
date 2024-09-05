import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/authApi";
import { loginSuccess, loginFailure } from "../../redux/authSlice";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { validationMessages } from "../../utils/utils";

import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
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
      localStorage.setItem("refresh_token", result.refresh_token);
      dispatch(loginSuccess(result));
      navigate("/products");
    } catch (error) {
      console.error("Login error:", error);

      if (error.message === "Invalid credentials") {
        setError("username", {
          type: "manual",
          message: validationMessages.invalidLogOrPass,
        });
        setError("password", {
          type: "manual",
          message: validationMessages.invalidLogOrPass,
        });
      } else {
        dispatch(loginFailure(error.message));
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <Input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: validationMessages.required,
          })}
          error={errors.username?.message}
        />

        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: validationMessages.required,
          })}
          error={errors.password?.message}
        />

        {error && <p className="error">{error}</p>}

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;

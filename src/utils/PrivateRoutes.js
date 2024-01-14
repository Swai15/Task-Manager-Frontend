import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const LoginPrivateRoute = () => {
  let { user } = useContext(AuthContext);

  return !user ? <Navigate to="login" /> : <Outlet />;
};

export default LoginPrivateRoute;

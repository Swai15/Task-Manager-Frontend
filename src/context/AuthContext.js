import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let localToken = localStorage.getItem("authTokens");
  let getAuthToken = localToken ? JSON.parse(localToken) : null;
  let getStoredUser = localToken ? jwtDecode(localToken) : null;

  let [authTokens, setAuthTokens] = useState(() => getAuthToken);
  let [user, setUser] = useState(() => getAuthToken);

  const history = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: e.target.loginUsername.value, password: e.target.loginPassword.value }),
    });
    const data = await response.json();
    console.log("data: ", data);

    if (response.status == 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/");
    } else {
      alert("Something went wrong!");
    }
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

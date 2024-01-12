import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(null);
  let [user, setUser] = useState(null);

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
  };

  let contextData = { loginUser: loginUser };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

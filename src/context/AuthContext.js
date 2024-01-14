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
  const [loading, setLoading] = useState(true);

  const [registrationErrors, setRegistrationErrors] = useState(null);

  const history = useNavigate();

  // Register User
  let registerUser = async (userData) => {
    try {
      let response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log("User Registered successfully");
        // console.log("data: ", data);
        // console.log("data tokens", data.tokens);
        setAuthTokens(data.tokens);

        // console.log("data token access", data.tokens.access);
        let logUser = jwtDecode(data.tokens.access);
        console.log("logUser: ", logUser);
        setUser(jwtDecode(data.tokens.access));
        localStorage.setItem("authTokens", JSON.stringify(data.tokens));
        history("/");
      } else {
        setRegistrationErrors(data);
        console.log("Registration failed ", data);
      }
    } catch (error) {
      console.error("Error during registration ", error);
    }
  };

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

  // Logout User
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history("/login");
  };

  let updateToken = async () => {
    console.log("Update Token Called");
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // ? for if authToken is not there
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();

    if (response.status == 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/");
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  //data
  let contextData = {
    user: user,
    authTokens: authTokens,
    registrationErrors: registrationErrors,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 600 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};

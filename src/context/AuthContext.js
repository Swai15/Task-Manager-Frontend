import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let localToken = localStorage.getItem("authTokens");
  let getAuthToken = localToken ? JSON.parse(localToken) : null;
  let getStoredUser = localToken ? jwtDecode(localToken) : null;

  let [authTokens, setAuthTokens] = useState(() => getAuthToken || null);
  let [user, setUser] = useState(() => getAuthToken || null);
  const [loading, setLoading] = useState(true);

  const [registrationErrors, setRegistrationErrors] = useState(null);
  const [loginErrors, setLoginErrors] = useState(null);

  const history = useNavigate();

  const URL = "https://jules.pythonanywhere.com/api/";
  // const URL = "http://127.0.0.1:8000/api/";

  // Register User
  let registerUser = async (userData) => {
    try {
      let response = await fetch(URL + "/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.status === 201) {
        // console.log("User Registered successfully");
        // console.log("data: ", data);
        // console.log("data tokens", data.tokens);
        setAuthTokens(data.tokens);

        // console.log("data token access", data.tokens.access);
        let logUser = jwtDecode(data.tokens.access);
        // console.log("decoded data.tokens.access: ", logUser);
        setUser(jwtDecode(data.tokens.access));
        localStorage.setItem("authTokens", JSON.stringify(data.tokens));
        // history("/");
        return data;
      } else {
        setRegistrationErrors(data);
        // console.log("Registration failed ", data);
        throw new Error("Registration Failed");
      }
    } catch (error) {
      // console.error("Error during registration ", error);
      throw new Error("Error during registration");
    }
  };

  // Login Users
  let loginUser = async (e, inputUsername, inputPassword) => {
    e.preventDefault();

    setLoginErrors(null);
    try {
      let response = await fetch(URL + "token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: inputUsername, password: inputPassword }),
      });
      const data = await response.json();
      // First check
      // console.log("data: ", data);

      if (response.status == 200 && data) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        // Second check
        // console.log("Access: ", String(authTokens.access));
        history("/");
      } else {
        setLoginErrors(data);
        // console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login ", error);
      throw new Error("Error during login");
    }
  };

  // Logout User
  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history("/login");
  };

  // Update token
  let updateToken = async () => {
    // console.log("Update Token Called");
    // if (!authTokens || !authTokens.access) {
    //   console.log("No access token found");
    //   return;
    // }

    let response = await fetch(URL + "token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authTokens?.access}`,
        Authorization: "Bearer " + String(authTokens?.access),
      },
      // ? for if authToken is not there
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();
    // console.log("Data:", data);

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
    loginErrors: loginErrors,
    setLoginErrors: setLoginErrors,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let refreshTime = 1000 * 600 * 23;
    // let refreshTime = 4000;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, refreshTime);
    return () => {
      clearInterval(interval);
    };
  }, [authTokens, loading]);

  return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};

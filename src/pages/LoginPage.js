import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginRegister.css";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <div className=" login-container ">
        <div className="card login-card p-4">
          <form onSubmit={loginUser}>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Enter a username
              </label>
              <input type="text" className="form-control" id="login-username" name="loginUsername" />
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Enter a password
              </label>
              <input type="password" className="form-control" id="login-password" name="loginPassword" />
            </div>
            {/* buttons */}
            <div className="login-buttons">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="register-link">
              <p>
                Don't have an account?
                <Link to="/register" className="register-link-style">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

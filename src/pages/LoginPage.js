import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginRegister.css";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";

const LoginPage = () => {
  let { loginUser, loginErrors, setLoginErrors } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let inputUsername = e.target.Username.value;
    let inputPassword = e.target.Password.value;
    loginUser(e, inputUsername, inputPassword);
  };

  const handleErrorState = () => {
    setLoginErrors(null);
  };

  return (
    <div>
      <Header />
      <div className=" login-container ">
        <div className="card login-card p-4">
          <form onSubmit={handleLoginSubmit}>
            {/* username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Enter a username
              </label>
              <input type="text" onChange={handleErrorState} className="form-control" id="login-username" name="Username" />
            </div>
            {/* password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Enter a password
              </label>
              <input type="password" onChange={handleErrorState} className="form-control" id="login-password" name="Password" />
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
        {loginErrors && (
          <div className="alert alert-danger mt-0 register-error-alert">
            <p>{loginErrors.detail}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

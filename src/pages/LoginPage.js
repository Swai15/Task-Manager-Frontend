import React from "react";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className=" login-container ">
      <div className="card login-card p-4">
        <form>
          {/* username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Enter a username
            </label>
            <input type="text" className="form-control" id="login-username" name="login-username" />
          </div>
          {/* password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter a password
            </label>
            <input type="password" className="form-control" id="login-password" name="login-password" />
          </div>
          {/* buttons */}
          <div className="login-buttons">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

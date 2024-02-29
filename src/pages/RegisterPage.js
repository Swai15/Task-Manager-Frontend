import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
import "../styles/LoginRegister.css";

const RegisterPage = () => {
  const { registerUser, loginUser, registrationErrors } = useContext(AuthContext);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [formUserData, setFormUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let inputUsername = e.target.Username.value;
    let inputPassword = e.target.Password.value;

    if (formUserData.password !== formUserData.confirm_password) {
      setPasswordMatch(false);
      console.log("password mismatch");
      return;
    } else {
      setPasswordMatch(true);
    }

    setRegistrationLoading(true);

    try {
      await registerUser(formUserData);
      console.log("proceed with login");
      await loginUser(e, inputUsername, inputPassword);
    } catch (error) {
      console.log("Registration or login failed: ", error);
    } finally {
      setRegistrationLoading(false);
    }

    // registerUser(formUserData)
    //   .then((registrationResponse) => {
    //     console.log("proceed with login");
    //     return loginUser(e, inputUsername, inputPassword);
    //   })
    //   .catch((error) => {
    //     console.log("Registration or login failed: ", error);
    //   });
  };

  return (
    <div className="register-container-parent">
      <div className="register-container">
        <h3>Register</h3>
        <div className="card register-card p-4">
          <form onSubmit={handleRegisterSubmit}>
            <div className="row">
              {/* Left side */}

              {/* Username */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input type="text" required className="form-control" id="register-username" name="Username" value={formUserData.username} onChange={(e) => setFormUserData({ ...formUserData, username: e.target.value })} />
                </div>

                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" required className="form-control" id="register-firstName" name="first_name" value={formUserData.first_name} onChange={(e) => setFormUserData({ ...formUserData, first_name: e.target.value })} />
                </div>

                {/* Last name */}
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Second Name
                  </label>
                  <input type="text" className="form-control" id="register-lastName" name="last_name" value={formUserData.last_name} onChange={(e) => setFormUserData({ ...formUserData, last_name: e.target.value })} />
                </div>
              </div>

              {/* Right side */}

              {/* Email */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input type="email" required className="form-control " id="register-email" name="email" value={formUserData.email} onChange={(e) => setFormUserData({ ...formUserData, email: e.target.value })} />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    className={`form-control ${!passwordMatch ? "is-invalid" : ""}`}
                    id="register-password"
                    name="Password"
                    value={formUserData.password}
                    onChange={(e) => setFormUserData({ ...formUserData, password: e.target.value })}
                  />
                </div>

                {/* Confirm password */}
                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    className={`form-control ${!passwordMatch ? "is-invalid" : ""}`}
                    id="register-confirmPassword"
                    name="confirm_password"
                    value={formUserData.confirm_password}
                    onChange={(e) => setFormUserData({ ...formUserData, confirm_password: e.target.value })}
                  />
                  {!passwordMatch && <div className="invalid-feedback">Passwords do not match</div>}
                </div>
              </div>
            </div>

            {/* Register buttons */}
            <div className="login-buttons">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>

            {registrationLoading && <div>Loading...</div>}

            {registrationErrors && (
              <div className="alert alert-danger register-error-alert">
                {Object.keys(registrationErrors).map((field) => (
                  <div key={field}>
                    {registrationErrors[field].map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div className="register-link">
              <p>
                Already have an account?
                <Link to="/login" className="register-link-style">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;

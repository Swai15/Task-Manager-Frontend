import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="header">
      <h3>Task Manager</h3>

      {user ? <p onClick={logoutUser}>Logout</p> : <Link to="login">Login</Link>}

      {user ? <p>Hello {user.username}</p> : <p>Guest</p>}
    </div>
  );
};

export default Header;

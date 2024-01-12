import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user } = useContext(AuthContext);
  return (
    <div className="header">
      <h3>Task Manager</h3>
      {user ? <p>Logout</p> : <Link to="login">Login</Link>}

      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Header;

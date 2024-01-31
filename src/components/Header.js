import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { HeaderIcon } from "../icons/projectsIcons";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="header-logo-div">
        {<HeaderIcon />}
        <h3>Task Manager</h3>
      </div>

      {user ? <p onClick={logoutUser}>Logout</p> : <Link to="login">Login</Link>}

      {user ? <p>Hello {user.username}</p> : <p>Guest</p>}
    </div>
  );
};

export default Header;

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

      <div className="header-username">{user ? <p>Hello {user.username}</p> : ""}</div>

      <div className="header-login">{user ? <p onClick={logoutUser}>Logout</p> : <p className="header-hide">Filler</p>}</div>
    </div>
  );
};

export default Header;

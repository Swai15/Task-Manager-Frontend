import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { name } = useContext(AuthContext);
  return (
    <div>
      <h3>Task Manager</h3>
      <Link to="login">Login</Link>
      {/* <p>Hello {name}</p> */}
    </div>
  );
};

export default Header;

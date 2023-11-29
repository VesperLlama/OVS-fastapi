import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { message } from "antd";

const NavButtons = (props) => {
  const history = useHistory();
  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("aadhar");
    message.success("Logged out successfully!", 1.5, reload);
  };

  const reload = () => {
    history.push("/");
    window.location.reload();
  };

  if (props.obj) {
    return (
      <>
        <div className="register">
          <NavLink exact className="navlink" activeClassName="active" to="/signup">
            Register
          </NavLink>
        </div>
        <div className="login">
          <NavLink exact className="navlink" activeClassName="active" to="/signin">
            Login
          </NavLink>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="vote">
          <NavLink exact className="navlink" activeClassName="active" to="/vote">
            Vote
          </NavLink>
        </div>
        <div className="logout">
          <NavLink
            exact
            className="navlink"
            activeClassName="active"
            to="/signout"
            onClick={logout}
          >
            Logout
          </NavLink>
        </div>
      </>
    );
  }
};

export default NavButtons;

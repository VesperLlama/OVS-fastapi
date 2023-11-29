import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavButtons from "./NavButtons";

const Navbar = () => {
  const [isLoggedIn, setisLoggedIn] = useState();

  useEffect(() => {
    if (localStorage.getItem("aadhar") == null) {
      setisLoggedIn(true);
    } else setisLoggedIn(false);
  }, []);

  return (
    <div className="NavContainer">
      <div className="MidCont">
        <img src="middle.png" alt="" />
      </div>
      <div className="RightSide">
        <div className="home">
          <NavLink exact className="navlink" activeClassName="active" to="/">
            Home
          </NavLink>
        </div>
        <NavButtons obj={isLoggedIn}></NavButtons>
      </div>
    </div>
  );
};

export default Navbar;

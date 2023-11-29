import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { message } from "antd";

const Login = () => {
  const history = useHistory();

  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = async (e) => {
    localStorage.setItem("aadhar", aadhar);

    e.preventDefault();

    const data = { aadharNo: aadhar, password: password };

    if (aadhar === "" || password === "") {
      message.error("Fill in all the fields");
    } else {
      Axios.post(`${process.env.REACT_APP_API_URL}/login`, data)
        .then((res) => {
          if (res.status === 200 && res.data) {
            message.success("Login Successful!", 1.5, reload);
          } else {
            message.error(
              "Incorrect Aadhaar Number or password. Please try again."
            );
            Promise.reject();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const reload = () => {
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="RegisterContainer">
      <div className="RegisterForm">
        <form method="POST">
          <div className="head">Login</div>
          <div className="aadhar">
            <label htmlFor="aadhar">Aadhar Number</label>
            <input
              className="inputBox"
              type="text"
              name="aadhar"
              id="aadhar"
              placeholder="Enter your aadhar number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              className="inputBox"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={LoginUser}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

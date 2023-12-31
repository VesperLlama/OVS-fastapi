import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { message } from "antd";
import digestMessage from "../Hash";

const Login = () => {
  const history = useHistory();

  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = async (e) => {
    localStorage.setItem("aadhar", aadhar);

    e.preventDefault();

    const hashedPassword = await digestMessage(password);
    const data = { aadharNo: aadhar, password: hashedPassword };

    if (aadhar === "" || password === "") {
      message.error("Fill in all the fields");
    } else {
      Axios.post(`${process.env.REACT_APP_API_URL}/login`, data)
        .then((res) => {
          if (res.status === 200 && res.data.token) {
            localStorage.setItem("token", res.data.token);
            message.success("Login Successful!", 1.5, reload);
          } else {
            message.error(
              "Incorrect Aadhaar Number or password. Please try again."
            );
            Promise.reject();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 422) {
            err.response.data.detail.forEach((element) => {
              if (element.loc[1] === "aadharNo") {
                message.error("Aadhar Number should have 12 numbers", 3);
              } else if (element.loc[1] === "password") {
                message.error("Password should have atleast 8 characters", 3);
              } else {
                message.error(element.msg, 3);
              }
            });
          }
        });
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

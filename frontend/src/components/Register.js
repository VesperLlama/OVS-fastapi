import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [aadharNo, setAadharNo] = useState(0);
  const user = [name, pass, mobileNo, aadharNo];

  const PostData = async (e) => {
    e.preventDefault();

    const data = {
      name: user[0],
      password: user[1],
      mobileNo: user[2],
      aadharNo: user[3],
      voteStatus: false,
    };

    if (user[0] === "" || user[1] === "" || user[2] === "" || user[3] === "") {
      message.error("Fill in all the fields");
    } else {
      Axios.post(`${process.env.REACT_APP_API_URL}/register`, data)
        .then((res) => {
          if (res.status === 200 && !res.data) {
            message.success(
              "Registered successfully!",
              1.5,
              history.push("/signin")
            );
          } else if (res.status === 200 && res.data.message) {
            message.error(res.data.message);
          }
          else {
            message.error("Failed to create an account. Please try again");
            Promise.reject();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="RegisterContainer">
      <div className="RegisterForm">
        <form method="POST">
          <div className="head">Register</div>
          <div className="name">
            <label htmlFor="name">Name</label>
            <input
              className="inputBox"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your Name"
              value={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mobile">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              className="inputBox"
              type="number"
              name="mobile"
              id="mobile"
              placeholder="Enter your Mobile Number"
              value={user.mobile}
              onChange={(e) => setMobileNo(e.target.value)}
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
              value={user.password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="aadhar">
            <label htmlFor="aadhar">Aadhar Number</label>
            <input
              className="inputBox"
              type="text"
              name="aadhar"
              id="aadhar"
              placeholder="Enter your aadhar number"
              value={user.aadhar}
              onChange={(e) => setAadharNo(e.target.value)}
            />
          </div>

          <button type="submit" onClick={PostData}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

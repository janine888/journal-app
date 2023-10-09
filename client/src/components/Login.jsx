import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const response = await axios.post("/api/users/login", credentials);

      // Store token locally
      localStorage.setItem("token", response.data.token);
      setData(response.data.message);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
      setData("Login failed. Please check your credentials.");
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setData(null);
    setIsLoggedIn(false);
  };

  const requestData = async () => {
    try {
      const response = await axios.get("/api/users/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setData(response.data.message);
    } catch (error) {
      console.error("Request data error:", error);
      setData("Failed to retrieve user data.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <div className="login-container">
        <div className="container text-center">
          <input
            placeholder="Username"
            value={username}
            onChange={handleChange}
            name="username"
            type="text"
            className="form-control mb-2"
          />
          <input
            placeholder="Password"
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control mb-2"
          />
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-outline-success" onClick={login}>
              Log in
            </button>
            <button className="btn btn-outline-dark ml-2" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </div>

      {data && <div className="text-center">{data}</div>}
      <br></br>
      {isLoggedIn ? (
        <div className="text-center">User is logged in</div>
      ) : (
        <div className="text-center">User is logged out</div>
      )}

      {/* <button onClick={requestData}>Request Data</button> */}
    </div>
  );
}

export default Login;

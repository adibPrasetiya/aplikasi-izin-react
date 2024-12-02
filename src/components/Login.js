import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { username, password },
        { withCredentials: true }
      );

      // Mengambil pesan dari response body
      const message = response.data;

      // Mengambil token dari header Authorization
      const token = response.headers["authorization"];

      if (token) {
        // Simpan token di localStorage
        localStorage.setItem("authToken", token);

        // Tampilkan alert sukses
        setAlert({ type: "success", message: "Login successful!" });

        // Arahkan ke dashboard setelah login
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setAlert({
          type: "danger",
          message: "Token not found in response headers.",
        });
      }
    } catch (error) {
      // Tampilkan pesan error
      const errorMessage =
        error.response?.data || "Terjadi kesalahan saat mencoba login.";
      setAlert({
        type: "danger",
        message: Array.isArray(errorMessage)
          ? errorMessage.join(", ")
          : JSON.stringify(errorMessage),
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              {alert.message && (
                <div className={`alert alert-${alert.type}`}>
                  {alert.message}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="username"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

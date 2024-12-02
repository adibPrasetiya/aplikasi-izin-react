import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus token dari localStorage
    localStorage.removeItem("authToken");

    // Redirect ke halaman login setelah 2 detik
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    // Bersihkan timer saat komponen unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h2 className="text-success">Logout Berhasil</h2>
        <p className="text-muted">
          Anda akan diarahkan ke halaman login dalam 2 detik...
        </p>
        <div
          className="spinner-border text-success mt-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;

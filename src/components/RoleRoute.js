import React from "react";
import { Navigate } from "react-router-dom";
import { getDecodedToken } from "../utils/decodeToken";

const RoleRoute = ({ children, allowedRoles }) => {
  const decodedToken = getDecodedToken();
  if (!decodedToken) {
    return <Navigate to="/" />;
  }

  const userRole = decodedToken.role;
  return allowedRoles.includes(userRole) ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default RoleRoute;

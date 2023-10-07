import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the JWT token is present in the cookie (you should implement this logic)
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (!token) {
    // If token is present, render the protected route
    return <Outlet />;
  } else {
    // If token is not present, redirect to the login page or handle it as needed
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;

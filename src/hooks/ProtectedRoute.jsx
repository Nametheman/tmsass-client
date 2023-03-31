import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Index = ({ component: Component, ...rest }) => {
  let isAuthorized = false;
  const token = sessionStorage.getItem("token");
  if (token !== null) {
    isAuthorized = true;
  }
  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default Index;

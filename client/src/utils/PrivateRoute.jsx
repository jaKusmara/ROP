import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return user ? <RootLayout /> : <NotFound/>;
};

export default PrivateRoute;
import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import socket from "./socekt";

const PrivateRoute = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      let user_id = user.user._id;
      socket.auth = { user_id };
      socket.connect();
    }

    if (!user) {
      socket.disconnect();
      socket.off("users");
    }
  }, [user]);

  return user ? <RootLayout /> : <AuthLayout />;
};

export default PrivateRoute;

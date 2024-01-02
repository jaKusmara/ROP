import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useContext/useAuthContext";
import socket from "../utils/socekt";
import { useEffect } from "react";

export default function AuthLayout() {
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
  return (
    <div className="flex flex-row h-screen">
      <div className="flex w-3/5 bg-slate-500"></div>
      <div className="flex flex-col w-2/5 bg-slate-600">
        <Outlet />
      </div>
    </div>
  );
}

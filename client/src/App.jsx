import { useEffect, useState } from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useContext/useAuthContext";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import RootLayout from "./layouts/RootLayout";
import DirectMessages from "./pages/DirectMessages";
import ProjectLayout from "./layouts/ProjectLayout";
import PrivateRoute from "./utils/PrivateRoute";
import ProjectDashboard from "./pages/project/ProjectDashboard";
import Board from "./pages/project/Board";
import Channel from "./pages/project/Channel";
import socket from "./utils/socekt";
import NotFound from "./pages/NotFound";

const App = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user) {
      let user_id = user.user._id;
      socket.auth = { user_id };
      socket.connect();
    }

    socket.on("users", (users) => {
      setUsers(users);
    });
    if (!user) {
      socket.disconnect();
      socket.off("users");
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <SignUp /> },
          ],
        },
        {
          element: <PrivateRoute />,
          path: "/",
          children: [
            { index: true, element: user ? <Dashboard /> : <NotFound /> },
            { path: "messages", element: <DirectMessages /> },
            {
              path: "project/:project_id",
              element: <ProjectLayout />,
              children: [
                { index: true, element: <ProjectDashboard /> },
                {
                  path: "tasks",
                  element: <Board />,
                },
                {
                  path: "channel/:channel_id",
                  element: <Channel />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

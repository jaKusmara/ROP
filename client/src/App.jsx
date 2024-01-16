import { useEffect, useState } from "react";
import "./index.css";
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
import NotFound from "./pages/NotFound";
import Settings from "./pages/project/Settings";

const App = () => {
  const { user } = useAuthContext();

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
                {
                  path: "settings",
                  element: <Settings />,
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

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
import DirectMessages from "./pages/project/DirectMessages";
import ProjectLayout from "./layouts/ProjectLayout";
import PrivateRoute from "./utils/PrivateRoute";
import ProjectDashboard from "./pages/project/ProjectDashboard";
import Board from "./pages/project/Board";
import Channel from "./pages/project/Channel";
import NotFound from "./pages/NotFound";
import Settings from "./pages/project/Settings";
import MessageLayout from "./layouts/MessageLayout";
import Home from "./pages/auth/Home";

const App = () => {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          element: <PrivateRoute />,
          path: "/",
          children: [
            { index: true, element: user ? <Dashboard /> : <Home /> },
            {
              element: <MessageLayout />,
              children: [{ path: "messages", element: <DirectMessages /> }],
            },
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
        {
          path: "/",
          element: <AuthLayout />,
          children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <SignUp /> },
            { path: "/", element: <Home />, index: true },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

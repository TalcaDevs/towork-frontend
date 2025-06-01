import { RouteObject } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import AuthGuard from "../middlewares/AuthGuard";
import NotFound from "../pages/404";
import TemplateLoader from "../pages/templates/TemplateLoader";

// Public routes accessible to all users
export const routes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(Home),
  },
  {
    path: "/signup",
    element: React.createElement(SignUp),
  },
  {
    path: "/signin",
    element: React.createElement(SignIn),
  },

  // Protected route with AuthGuard
  {
    path: "/profile",
    element: React.createElement(
      AuthGuard,
      null,
      React.createElement(React.lazy(() => import("../pages/Profile")))
    ),
  },
  {
    path: "/profile/:id",
    element: React.createElement(TemplateLoader),
  },

  // 404 fallback (optional)
  {
    path: "*",
    element: React.createElement(NotFound),
  },
];

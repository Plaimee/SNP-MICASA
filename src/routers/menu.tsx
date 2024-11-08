import { RouteObject } from "react-router-dom";
import Home from "@/views/private/HomePage";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import MoreRegisterDetailPage from "@/views/MoreRegisterDetailPage";

export const publicRoutes: RouteObject[] = [
  { path: "*", element: <></> },
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <Home /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register/more-detail", element: <MoreRegisterDetailPage /> },
];

export const routes: RouteObject[] = [
  { path: "/home", element: <Home />, },
];
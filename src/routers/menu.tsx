import { RouteObject } from "react-router-dom";
import Guest from "@/views/GuestPage";
import Home from "@/views/private/HomePage";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import MoreRegisterDetailPage from "@/views/MoreRegisterDetailPage";
import FamilyPage from "@/views/private/FamilyPage";
import CreateFamilyPage from "@/views/private/CreateFamilyPage";
import ProfilePage from "@/views/private/ProfilePage";

export const publicRoutes: RouteObject[] = [
  { path: "*", element: <></> },
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <Guest /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register/more-detail", element: <MoreRegisterDetailPage /> },
  
];

export const privateRoutes: RouteObject[] = [
  { path: "/home", element: <Home />, },
  { path: "/family", element: <FamilyPage />},
  { path: "/family/create", element: <CreateFamilyPage />},
  { path: "/profile", element: <ProfilePage />},
];
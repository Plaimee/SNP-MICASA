import { RouteObject } from "react-router-dom";
import Guest from "@/views/public/GuestPage";
import Home from "@/views/private/HomePage";
import LoginPage from "@/views/public/authenticate/LoginPage";
import RegisterPage from "@/views/public/authenticate/RegisterPage";
import MoreRegisterDetailPage from "@/views/public/authenticate/MoreRegisterDetailPage";
import FamilyPage from "@/views/private/family/FamilyPage";
import CreateFamilyPage from "@/views/private/family/CreateFamilyPage";
import ProfilePage from "@/views/private/profile/ProfilePage";
import JoinFamilyPage from "@/views/private/family/JoinFamilyPage";
import FamilyMemberPage from "@/views/private/family/FamilyMemberPage";
import ActivityPage from "@/views/private/family/activities/ActivityPage";
import AllStatusPage from "@/views/private/status/AllStatusPage";
import MenuPage from "@/views/private/family/menus/MenuPage";

export const publicRoutes: RouteObject[] = [
  { path: "*", element: <></> },
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <Guest /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register/more-detail", element: <MoreRegisterDetailPage /> },
];

export const privateRoutes: RouteObject[] = [
  { path: "*", element: <></> },
  { path: "/home", element: <Home /> },
  { path: "/family", element: <FamilyPage /> },
  { path: "/family/create", element: <CreateFamilyPage /> },
  { path: "/family/join", element: <JoinFamilyPage /> },
  { path: "/family/member", element: <FamilyMemberPage /> },
  { path: "/activity", element: <ActivityPage /> },
  { path: "/activity/status", element: <AllStatusPage /> },
  { path: "/menu", element: <MenuPage /> },
  { path: "/profile", element: <ProfilePage /> },
];

import { RouteObject } from "react-router-dom";
import Guest from "@/views/public/GuestPage";
import Home from "@/views/private/HomePage";
import LoginPage from "@/views/public/authenticate/LoginPage";
import RegisterPage from "@/views/public/authenticate/RegisterPage";
import MoreRegisterDetailPage from "@/views/public/authenticate/MoreRegisterDetailPage";
import FamilyPage from "@/views/private/FamilyPage";
import CreateFamilyPage from "@/views/private/CreateFamilyPage";
import ProfilePage from "@/views/private/ProfilePage";
import JoinFamilyPage from "@/views/private/JoinFamilyPage";
import FamilyMemberPage from "@/views/private/FamilyMemberPage";
import ActivityPage from "@/views/private/ActivityPage";
import PendingPage from "@/views/private/PendingPage";
import SuccessPage from "@/views/private/SuccessPage";
import FailedPage from "@/views/private/FailedPage";

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
  { path: "/activity/pending", element: <PendingPage /> },
  { path: "/activity/success", element: <SuccessPage /> },
  { path: "/activity/failed", element: <FailedPage /> },
  { path: "/profile", element: <ProfilePage /> },
];

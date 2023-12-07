import { createBrowserRouter, Navigate } from "react-router-dom";

// import ErrorPage from "../pages/Error";
import MainLayout from "../layouts/MainLayout";
import LoginPage, { action as LoginAction } from "../pages/Login";
import PlayerLayout from "../layouts/PlayerLayout";
import PlayerMainPage from "../pages/Player/Main";
import PlayerApplyPage from "../pages/Player/Apply";
import PlayerResultPage from "../pages/Player/Result";
import AdminLayout from "../layouts/AdminLayout";
import AdminMainPage from "../pages/Admin/Main";
import PlayersInfo from "../pages/Admin/Players/PlayersInfo";
import AttendanceInfo from "../pages/Admin/Attendance/AttendanceInfo";
import ApplyInfo from "../pages/Admin/Apply/ApplyInfo";
import { cookieLoader } from "../storage/Cookie";
import { action as logoutAction } from "../pages/Login/Logout";
import RequireAuth from "../components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    loader: cookieLoader,
    children: [
      // public routes
      {
        path: "login",
        element: <LoginPage />,
        action: LoginAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      // private routes
      {
        element: <RequireAuth allowedRoles={["player", "admin"]} />,
        children: [
          {
            path: "player",
            element: <PlayerLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="main" />,
              },
              {
                path: "main",
                element: <PlayerMainPage />,
              },
              {
                path: "apply",
                element: <PlayerApplyPage />,
              },
              {
                path: "apply/result",
                element: <PlayerResultPage />,
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="main" />,
              },
              {
                path: "main",
                element: <AdminMainPage />,
              },
              {
                path: "players",
                element: <PlayersInfo />,
              },
              {
                path: "attendances",
                element: <AttendanceInfo />,
              },
              {
                path: "applys",
                element: <ApplyInfo />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

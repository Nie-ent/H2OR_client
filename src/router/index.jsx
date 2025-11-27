//src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
// import UserLayout from "../layout/UserLayout";
// import ProtectRoute from "../components/ProtectRoute";
import LandingPage from "../pages/Client/LandingPage";
import ApplicationResumePage from "../pages/User/ApplicationResumePage";
import DashboardPage from "../pages/Admin/DashboardPage";
import RegisterAdminPage from "../pages/Admin/RegisterAdminPage";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
// import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/apply",
    element: <ApplicationResumePage />,
  },

  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },

  {
    path: "/super-admin/login",
    element: <AdminLoginPage />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "create-admin",
        element: <RegisterAdminPage />,
      },
    ],
  },
]);

export default router;

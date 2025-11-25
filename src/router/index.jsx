//src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";
import ApplicationResumePage from "../pages/User/ApplicationResumePage";
import LandingPage from "../pages/Client/LandingPage";
import DashboardPage from "../pages/Admin/DashboardPage";
import AdminLayout from "../layout/AdminLayout";

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
    path: "/admin",
    element: <AdminLayout />,
    children: [
            {
                index: true, // เข้า /admin เฉยๆ ให้เจอ Dashboard
                element: <DashboardPage />
            },
            // ในอนาคตเพิ่มหน้าจัดการ User ได้ง่ายๆ แค่เพิ่มบรรทัดนี้:
            // { path: 'users', element: <ManageUsersPage /> },
            // { path: 'settings', element: <SettingsPage /> },
        ]
  },
]);

export default router;
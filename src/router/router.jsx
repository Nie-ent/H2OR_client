// import { createBrowserRouter } from "react-router-dom";
// import AdminLayout from "../layout/AdminLayout";
// import LandingPage from "../pages/Client/LandingPage";
// import ApplicationResumePage from "../pages/User/ApplicationResumePage";
// import DashboardPage from "../pages/Admin/DashboardPage";
// import RegisterAdminPage from "../pages/Admin/RegisterAdminPage";
// import AdminLoginPage from "../pages/Admin/AdminLoginPage";
// import QuizPage from "../pages/user/QuizPage";
// import AdminForgotPasswordPage from "../pages/Admin/AdminForgotPasswordPage";
// import JobApplicantInformation from "../pages/Admin/JobApplicantInformation";
// import WelcomeTestPage from "../pages/User/WelcomeTestPage";

import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/client/LandingPage";
import AdminLayout from "../layout/AdminLayout";
import DashboardPage from "../pages/Admin/DashboardPage";
import RegisterAdminPage from "../pages/Admin/RegisterAdminPage";
import JobApplicantInformation from "../pages/Admin/JobApplicantInformation";
import QuizPage from "../pages/user/QuizPage";
import ApplicationResumePage from "../pages/user/ApplicationResumePage";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminForgotPasswordPage from "../pages/Admin/AdminForgotPasswordPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LandingPage />,
//   },

//   {
//     path: "/apply",
//     element: <ApplicationResumePage />,

//   },
//   {
//     path: "/welcome-test/:candidate_id",
//     element: <WelcomeTestPage />,
//   },

//   {
//     path: "/admin/login",
//     element: <AdminLoginPage />,
//   },

//   {
//     path: "/admin/forgotpassword",
//     element: <AdminForgotPasswordPage />,
//   },

//   {
//     path: "/super-admin/login",
//     element: <AdminLoginPage />,
//   },

//   {
//     path: "/admin",
//     element: <AdminLayout />,
//     children: [
//       {
//         index: true,
//         element: <DashboardPage />,
//       },

//       {
//         path: "create-admin",
//         element: <RegisterAdminPage />,
//       },
//       {
//         path: "/admin/users",
//         element: < JobApplicantInformation />,
//       },
//     ],
//   },

//   {
//     path: "/quiz",
//     element: <QuizPage />,
//   },
// ]);

// export default router;


export const userRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "applicant", element: <ApplicationResumePage /> },
    { path: "admin/login", element: <AdminLoginPage /> },
    { path: "admin/forgot", element: <AdminForgotPasswordPage /> },
    { path: "*", element: <LandingPage /> },
])

export const examRouter = createBrowserRouter([
    { path: "/", element: <QuizPage /> },
    { path: "*", element: <QuizPage /> },
])

export const adminRouter = createBrowserRouter([
    {
        path: "/", element: <AdminLayout />, children: [
            { index: true, element: <DashboardPage /> },
            { path: "admin/register", element: <RegisterAdminPage /> },
            { path: "admin/users", element: <JobApplicantInformation /> },
            { path: "*", element: <DashboardPage /> },
        ]
    }
])

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
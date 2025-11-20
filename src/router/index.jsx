import { createBrowserRouter } from "react-router";
import DashboardPage from "../pages/Admin/DashboardPage";
import LandingPage from "../pages/Client/LandingPage";
import ApplicationResumePage from "../pages/User/ApplicationResumePage";

export const clientRouter = createBrowserRouter([
    { path: '/', element: <LandingPage /> }
])

export const userRouter = createBrowserRouter([
    { path: '/', element: <ApplicationResumePage /> },
])

export const adminRouter = createBrowserRouter([
    {
        path: '/', element: <MainLayout />, children: [
            { index: true, element: <DashboardPage /> }
        ]
    }
])

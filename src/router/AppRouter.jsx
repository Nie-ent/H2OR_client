import { RouterProvider } from 'react-router'
import { adminRouter, examRouter, userRouter } from './router'

function AppRouter() {

    const isLoggedIn = Boolean(localStorage.getItem("token"));
    const isApplicantResume = Boolean(localStorage.getItem("candidate_id"));

    const router = isLoggedIn
        ? adminRouter
        : isApplicantResume
            ? examRouter
            : userRouter;

    return <RouterProvider router={router} />;
}

export default AppRouter;

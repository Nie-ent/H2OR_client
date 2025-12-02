//src/router/AppRouter.jsx

{/* Testing only */}
import { ToastContainer } from 'react-toastify'

import { RouterProvider } from 'react-router'
import router, { adminRouter, clientRouter, userRouter } from './index'

function AppRouter() {

    clientRouter //landingPage
    adminRouter //adminPage
    userRouter //userPage


    return (
        <>
        <RouterProvider router={router} />
        
        {/* Testing only */}
        <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default AppRouter
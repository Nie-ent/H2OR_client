import { RouterProvider } from 'react-router'
import { adminRouter, examRouter, userRouter } from './router'

function AppRouter() {

    const isLoggedIn = Boolean(localStorage.getItem("token"))

    console.log('isLoggedIn', isLoggedIn)

    const router = isLoggedIn ? adminRouter : userRouter

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRouter

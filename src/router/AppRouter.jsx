import { RouterProvider } from 'react-router'
import { adminRouter, clientRouter, userRouter } from './index'

function AppRouter() {

    clientRouter //landingPage
    adminRouter //adminPage
    userRouter //userPage


    return (
        <RouterProvider router={clientRouter} />
    )
}

export default AppRouter
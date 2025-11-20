import { RouterProvider } from 'react-router'
import { adminRouter, clientRouter, userRouter } from './index'

function AppRouter() {

    clientRouter
    adminRouter
    userRouter


    return (
        <RouterProvider router={clientRouter} />
    )
}

export default AppRouter
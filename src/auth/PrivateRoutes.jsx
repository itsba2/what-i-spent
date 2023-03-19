import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const PrivateRoutes = () => {
    const { currentUser } = useAuth()
    const location = useLocation()

    currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />

}

export default PrivateRoutes

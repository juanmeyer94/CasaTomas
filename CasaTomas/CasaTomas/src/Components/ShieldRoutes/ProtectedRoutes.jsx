import { useAuth } from "../Dashboard/Context/AdminContext";
import {Navigate, Outlet} from "react-router-dom"


const ProtectedRoutes = () => {
    const {user, isAuthenticated, loading} =useAuth()

    if(loading) return <h1>cargando</h1>
    if(!loading && !isAuthenticated) return <Navigate to="login" replace/>

    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default ProtectedRoutes;
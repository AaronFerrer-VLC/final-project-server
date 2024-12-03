import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"

const PrivateRoute = () => {

    const { loggedUser, isFetchingUser } = useContext(AuthContext)

    if (isFetchingUser) {
        return <h1>ESPERANDO USUARIO....</h1>
    }

    if (!loggedUser) {
        return <Navigate to="/inicio-sesion" />
    }

    return <Outlet />
}

export default PrivateRoute
import { createContext, useEffect, useState } from "react"
import authServices from "../services/auth.services"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUser, setLoggedUser] = useState(null)
    const [isFetchingUser, setIsFetchingUser] = useState(true)

    const loginUser = userData => {
        setLoggedUser(userData)
    }

    const logoutUser = () => {
        setLoggedUser(null)
        setIsFetchingUser(false)
        localStorage.removeItem('authToken')
    }

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {
            authServices
                .verifyUser(token)
                .then(({ data }) => {
                    loginUser(data.loggedUserData)
                    setIsFetchingUser(false)
                })
                .catch(err => logoutUser())
        } else {
            logoutUser()
        }
    }

    useEffect(() => authenticateUser, [])

    return (
        <AuthContext.Provider value={{ loggedUser, loginUser, logoutUser, authenticateUser, isFetchingUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }
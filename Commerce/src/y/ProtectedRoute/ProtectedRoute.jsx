import { children } from "react"
import Login from "../Login/Login"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}) {

if (!localStorage.getItem("accessToken")) {
    return <Navigate to={'/login'}/>
}

  return children
}

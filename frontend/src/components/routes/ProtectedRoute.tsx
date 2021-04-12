import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from "../../context/userContext"

interface ProtectedRouteProps {
  exact?: boolean
  path: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  ...props
}) => {
  const {
    currentUser: { isLoggedIn },
  } = useContext(UserContext)

  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to="/login" />}</Route>
  )
}

export default ProtectedRoute

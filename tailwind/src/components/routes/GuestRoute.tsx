import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from "../../context/userContext"

interface GuestRouteProps {
  exact?: boolean
  path: string
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children, ...props }) => {
  const {
    currentUser: { isLoggedIn },
  } = useContext(UserContext)

  return <Route {...props}>{isLoggedIn ? <Redirect to="/" /> : children}</Route>
}

export default GuestRoute

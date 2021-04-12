import { Route } from "react-router-dom"

interface PublicRouteProps {
  exact?: boolean
  path: string
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, ...props }) => {
  return <Route {...props}>{children}</Route>
}

export default PublicRoute

import { Link, useHistory } from "react-router-dom"
import { AuthLoginForm, AuthLayout } from "../components/auth"
import { useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"

const LoginPage: React.FC = () => {
  const {
    currentUser: { isLoggedIn },
  } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/")
    }
  }, [isLoggedIn, history])

  return (
    <AuthLayout>
      <AuthLayout.Section>
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <AuthLoginForm />
      </AuthLayout.Section>
      <AuthLayout.Section>
        <p>
          New to MindX Images?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-500">
            Click here to sign up.
          </Link>
        </p>
      </AuthLayout.Section>
    </AuthLayout>
  )
}

export default LoginPage

import { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthSignUpForm, AuthLayout } from "../components/auth"
import { UserContext } from "../context/userContext"

const SignUpPage: React.FC = () => {
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
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <AuthSignUpForm />
      </AuthLayout.Section>
      <AuthLayout.Section>
        <p>
          Already has an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Click here to log in.
          </Link>
        </p>
      </AuthLayout.Section>
    </AuthLayout>
  )
}

export default SignUpPage

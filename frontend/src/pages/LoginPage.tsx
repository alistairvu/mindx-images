import { Link } from "react-router-dom"
import { AuthLoginForm, AuthLayout } from "../components/auth"

const LoginPage: React.FC = () => {
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

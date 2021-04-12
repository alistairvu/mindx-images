import { Link } from "react-router-dom"
import { AuthSignUpForm, AuthLayout } from "../components/auth"

const SignUpPage: React.FC = () => {
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

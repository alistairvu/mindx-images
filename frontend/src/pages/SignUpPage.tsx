import { Link } from "react-router-dom"
import { AuthSignUpForm, AuthLayout } from "../components/auth"
import Card from "react-bootstrap/Card"

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <AuthLayout.Section>
        <Card.Body>
          <Card.Title className="mb-3">Sign Up</Card.Title>
          <AuthSignUpForm />
        </Card.Body>
      </AuthLayout.Section>
      <AuthLayout.Section>
        <Card.Body>
          <Card.Text>
            Already has an account?{" "}
            <Link to="/login">Click here to log in.</Link>
          </Card.Text>
        </Card.Body>
      </AuthLayout.Section>
    </AuthLayout>
  )
}

export default LoginPage

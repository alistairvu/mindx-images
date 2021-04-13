import { Link } from "react-router-dom"
import { AuthLoginForm, AuthLayout } from "../components/auth"
import Card from "react-bootstrap/Card"

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <AuthLayout.Section>
        <Card.Body>
          <Card.Title className="mb-3">Log In</Card.Title>
          <AuthLoginForm />
        </Card.Body>
      </AuthLayout.Section>
      <AuthLayout.Section>
        <Card.Body>
          <Card.Text>
            New to MindX Images?{" "}
            <Link to="/signup">Click here to sign up.</Link>
          </Card.Text>
        </Card.Body>
      </AuthLayout.Section>
    </AuthLayout>
  )
}

export default LoginPage

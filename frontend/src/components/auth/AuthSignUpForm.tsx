import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { useState, useEffect } from "react"
import axios from "axios"

const AuthSignUpForm: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [signUpError, setSignUpError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignUpError("")

    if (password !== passwordConfirmation) {
      setSignUpError("Passwords do not match!")
      return
    }

    try {
      const body = { user: { email, password } }
      const { data } = await axios.post("/api/auth/signup", body)
      console.log(data)
    } catch (err) {
      console.log(err)
      setSignUpError(err.response.data.message)
    }
  }

  useEffect(() => {
    setSignUpError("")
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="email"
        required
        name="email"
        className="mb-3"
        placeholder="Enter your email..."
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Form.Control
        type="password"
        required
        name="password"
        className="mb-3"
        placeholder="Enter your password..."
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <Form.Control
        type="password"
        required
        id="password-confirmation"
        name="passwordConfirmation"
        className="mb-3"
        placeholder="Confirm your password..."
        value={passwordConfirmation}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPasswordConfirmation(e.target.value)
        }
      />
      {signUpError && (
        <Alert variant="danger" className="mb-3">
          {signUpError}
        </Alert>
      )}
      <Button type="submit" variant="primary" className="w-100">
        Sign Up
      </Button>
    </Form>
  )
}

export default AuthSignUpForm

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/userContext"

const AuthLoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loginError, setLoginError] = useState<string>("")
  const { loginCurrentUser } = useContext(UserContext)
  const history = useHistory()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const body = { user: { email, password } }
      const { data } = await axios.post("/api/auth/login", body)
      loginCurrentUser({
        token: data.token,
        id: data.user._id,
        email: data.user.email,
      })
      console.log(data)
      history.push("/")
    } catch (err) {
      console.log(err)
      setLoginError(err.response.data.message)
    }
  }

  useEffect(() => {
    setLoginError("")
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="email"
        required
        id="email"
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
        id="password"
        name="password"
        className="mb-3"
        placeholder="Enter your password..."
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      {loginError && (
        <Alert variant="danger" className="mb-3">
          {setLoginError}
        </Alert>
      )}
      <Button type="submit" variant="primary" className="w-100">
        Log In
      </Button>
    </Form>
  )
}

export default AuthLoginForm

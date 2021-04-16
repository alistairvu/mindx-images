import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { useState, useEffect, useContext } from "react"
import axiosClient from "../../api"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import { useForm } from "react-hook-form"

interface LoginInterface {
  email: string
  password: string
}

const AuthLoginForm: React.FC = () => {
  const [loginError, setLoginError] = useState<string>("")
  const { loginCurrentUser } = useContext(UserContext)
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>()

  const handleLogin = async (loginData: LoginInterface) => {
    try {
      const body = { user: { ...loginData } }
      const { data } = await axiosClient.post("/api/auth/login", body)
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
    <Form onSubmit={handleSubmit(handleLogin)}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Control
          type="email"
          placeholder="Enter your email..."
          {...register("email", { required: true })}
        />
        {errors.email && (
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Control
          type="password"
          placeholder="Enter your password..."
          {...register("password", { required: true })}
        />
        {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group>

      {loginError && (
        <Alert variant="danger" className="mb-3">
          {loginError}
        </Alert>
      )}
      <Button type="submit" variant="primary" className="w-100">
        Log In
      </Button>
    </Form>
  )
}

export default AuthLoginForm

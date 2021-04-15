import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { useState, useEffect, useContext } from "react"
import axiosClient from "../../api"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/userContext"

interface SignUpInterface {
  email: string
  password: string
  passwordConfirmation: string
}

const AuthSignUpForm: React.FC = () => {
  const [signUpError, setSignUpError] = useState<string>("")
  const { loginCurrentUser } = useContext(UserContext)
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInterface>()

  const handleSignUp = async (signUpData: SignUpInterface) => {
    setSignUpError("")

    if (signUpData.password !== signUpData.passwordConfirmation) {
      setSignUpError("Passwords do not match!")
      return
    }

    try {
      const body = {
        user: { email: signUpData.email, password: signUpData.password },
      }
      const { data } = await axiosClient.post("/api/auth/signup", body)
      console.log(data)
      if (data.success) {
        loginCurrentUser({
          token: data.token,
          id: data.user._id,
          email: data.user.email,
        })
        history.push("/")
      }
    } catch (err) {
      console.log(err)
      setSignUpError(err.response.data.message)
    }
  }

  useEffect(() => {
    setSignUpError("")
  }, [])

  return (
    <Form onSubmit={handleSubmit(handleSignUp)}>
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

      <Form.Group className="mb-3" controlId="password-confirmation">
        <Form.Control
          type="password"
          placeholder="Enter your password..."
          {...register("passwordConfirmation", { required: true })}
        />
        {errors.passwordConfirmation && (
          <Form.Text className="text-danger">
            {errors.passwordConfirmation.message}
          </Form.Text>
        )}
      </Form.Group>

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

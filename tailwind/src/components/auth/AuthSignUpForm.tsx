import { useState, useEffect, useRef } from "react"
import axiosClient from "../../api"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"

interface SignUpInterface {
  email: string
  password: string
  passwordConfirmation: string
}

const AuthSignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInterface>()
  const [signUpError, setSignUpError] = useState<string>("")

  const password = useRef<string>(null)
  password.current = watch("password", "")

  const history = useHistory()

  const handleSignUp = async (signUpData: SignUpInterface) => {
    setSignUpError("")
    try {
      const body = {
        user: { email: signUpData.email, password: signUpData.password },
      }
      const { data } = await axiosClient.post("/api/auth/signup", body)
      if (data.success) {
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
    <form onSubmit={handleSubmit(handleSignUp)}>
      <label className="block my-1">
        <span>Email</span>
        <input
          type="email"
          className="input"
          {...register("email", { required: "You must have an email" })}
        />
        {errors.email && (
          <small className="text-red-700">{errors.email.message}</small>
        )}
      </label>

      <label className="block my-1">
        <span>Password</span>
        <input
          type="password"
          className="input"
          {...register("password", { required: "You must have a password" })}
        />
        {errors.password && (
          <small className="text-red-700">{errors.password.message}</small>
        )}
      </label>

      <label className="block my-1">
        <span>Confirm Password</span>
        <input
          type="password"
          className="input"
          {...register("passwordConfirmation", {
            validate: (value) =>
              value === password.current || "Passwords must match",
          })}
        />
        {errors.passwordConfirmation && (
          <small className="text-red-700">
            {errors.passwordConfirmation.message}
          </small>
        )}
      </label>

      {signUpError && (
        <div className="px-4 py-2 my-1 text-red-500 bg-red-100 border border-red-500 rounded-md">
          {signUpError}
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 my-1 font-semibold text-white bg-blue-600 rounded-md focus:outline-none focus:ring hover:bg-blue-500"
      >
        Sign Up
      </button>
    </form>
  )
}

export default AuthSignUpForm

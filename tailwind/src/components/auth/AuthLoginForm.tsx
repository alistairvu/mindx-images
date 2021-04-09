import { useState, useEffect, useContext } from "react"
import axiosClient from "../../api"
import { UserContext } from "../../context/userContext"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"

interface LoginDataInterface {
  email: string
  password: string
}

const AuthLoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataInterface>()
  const [loginError, setLoginError] = useState<string>("")
  const { loginCurrentUser } = useContext(UserContext)
  const history = useHistory()

  const handleLogin = async (loginData: LoginDataInterface) => {
    try {
      const body = {
        user: { email: loginData.email, password: loginData.password },
      }
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
    <form onSubmit={handleSubmit(handleLogin)}>
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

      {loginError && (
        <div className="px-4 py-2 my-1 text-red-500 bg-red-100 border border-red-500 rounded-md">
          {loginError}
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 my-1 font-semibold text-white bg-blue-600 rounded-md focus:outline-none focus:ring hover:bg-blue-500"
      >
        Log In
      </button>
    </form>
  )
}

export default AuthLoginForm

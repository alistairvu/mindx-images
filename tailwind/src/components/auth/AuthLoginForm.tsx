import { useState, useEffect, useContext } from "react"
import axiosClient from "../../api"
import { UserContext } from "../../context/userContext"
import { useHistory } from "react-router-dom"

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
    <form onSubmit={handleSubmit}>
      <label className="block my-1">
        <span>Email</span>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </label>

      <label className="block my-1">
        <span>Password</span>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </label>

      {loginError && (
        <div className="px-4 py-2 my-1 text-red-500 bg-red-100 border border-red-500 rounded-md">
          {loginError}
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 my-1 font-semibold text-white bg-blue-600 focus:outline-none focus:ring hover:bg-blue-500 rounded-md"
      >
        Log In
      </button>
    </form>
  )
}

export default AuthLoginForm

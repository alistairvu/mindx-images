import { useState, useEffect } from "react"
import axios from "axios"

const AuthLoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loginError, setLoginError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const body = { user: { email, password } }
      const { data } = await axios.post("/api/auth/login", body)
      console.log(data)
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
        <div className="my-1 py-2 px-4 bg-red-100 border border-red-500 text-red-500 rounded-md">
          {loginError}
        </div>
      )}

      <button
        type="submit"
        className="py-2 px-4 bg-blue-600 focus:outline-none focus:ring hover:bg-blue-500 my-1 text-white font-semibold rounded-md w-full"
      >
        Log In
      </button>
    </form>
  )
}

export default AuthLoginForm

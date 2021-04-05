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
          required
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
          required
        />
      </label>

      <label className="block my-1">
        <span>Confirm Password</span>
        <input
          type="password"
          className="input"
          value={passwordConfirmation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirmation(e.target.value)
          }
          required
        />
      </label>

      {signUpError && (
        <div className="my-1 py-2 px-4 bg-red-100 border border-red-500 text-red-500 rounded-md">
          {signUpError}
        </div>
      )}

      <button
        type="submit"
        className="py-2 px-4 bg-blue-600 focus:outline-none focus:ring hover:bg-blue-500 my-1 text-white font-semibold rounded-md w-full"
      >
        Sign Up
      </button>
    </form>
  )
}

export default AuthSignUpForm

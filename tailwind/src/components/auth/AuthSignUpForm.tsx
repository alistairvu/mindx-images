import { useState, useEffect } from "react"
import axiosClient from "../../api"

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
      const { data } = await axiosClient.post("/api/auth/signup", body)
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

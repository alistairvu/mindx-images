import { createContext, useState, useEffect } from "react"
import axiosClient from "../api"

interface UserInfoInterface {
  id: string
  email: string
}

interface UserContextInterface {
  isLoggedIn: boolean
  isLoaded: boolean
  user: UserInfoInterface
}

export const UserContext = createContext(null)

export const UserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserContextInterface>({
    isLoggedIn: false,
    isLoaded: false,
    user: {
      id: "",
      email: "",
    },
  })

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axiosClient.get("/api/auth/status")

        if (data.success && data.loggedIn) {
          setCurrentUser({
            isLoggedIn: true,
            isLoaded: true,
            user: { id: data.user._id, email: data.user.email },
          })
        }

        if (data.success && !data.loggedIn) {
          setCurrentUser((prev) => ({ ...prev, isLoaded: true }))
        }

        console.log(data)
      } catch (err) {
        setCurrentUser((prev) => ({ ...prev, isLoaded: true }))
        console.log(err)
      }
    }

    checkUser()
  }, [])

  const loginCurrentUser = ({
    token,
    id,
    email,
  }: {
    token: string
    id: string
    email: string
  }) => {
    window.localStorage.setItem("jwt", token)
    setCurrentUser({
      isLoggedIn: true,
      isLoaded: true,
      user: {
        id,
        email,
      },
    })
  }

  const resetCurrentUser = () => {
    window.localStorage.removeItem("jwt")
    setCurrentUser({
      isLoggedIn: false,
      isLoaded: true,
      user: {
        id: "",
        email: "",
      },
    })
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        resetCurrentUser,
        loginCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

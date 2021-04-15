import { useLocation } from "react-router-dom"
import { AppHeader } from "./components"
import { UserContext } from "./context/userContext"
import { HomePage, LogInPage, SignUpPage, PostPage, UploadPage } from "./pages"
import { Switch } from "react-router-dom"
import { useContext, useEffect } from "react"
import { PublicRoute, GuestRoute, ProtectedRoute } from "./components/routes"
import { SocketContext } from "./context/socketContext"

const App: React.FC = () => {
  const location = useLocation()
  const { currentUser } = useContext(UserContext)
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!")
    })

    return () => socket.disconnect()
  }, [socket])

  if (!currentUser.isLoaded) {
    return (
      <>
        {location.pathname !== "/signup" && location.pathname !== "/login" && (
          <AppHeader />
        )}
      </>
    )
  }

  return (
    <>
      <header>
        {location.pathname !== "/signup" && location.pathname !== "/login" && (
          <AppHeader />
        )}
      </header>

      <main>
        <Switch>
          <PublicRoute exact path="/">
            <HomePage />
          </PublicRoute>
          <GuestRoute path="/login">
            <LogInPage />
          </GuestRoute>
          <GuestRoute path="/signup">
            <SignUpPage />
          </GuestRoute>
          <PublicRoute path="/post/:id">
            <PostPage />
          </PublicRoute>
          <ProtectedRoute path="/upload">
            <UploadPage />
          </ProtectedRoute>
        </Switch>
      </main>
    </>
  )
}

export default App

import { useLocation } from "react-router-dom"
import { AppHeader } from "./components"
import { UserContext } from "./context/userContext"
import { HomePage, LogInPage, SignUpPage, PostPage } from "./pages"
import { Switch } from "react-router-dom"
import { useContext } from "react"
import { PublicRoute, GuestRoute, ProtectedRoute } from "./components/routes"

const App: React.FC = () => {
  const location = useLocation()
  const { currentUser } = useContext(UserContext)

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
        </Switch>
      </main>
    </>
  )
}

export default App

import { AppHeader } from "./components"
import { Switch, Route, useLocation } from "react-router-dom"
import { HomePage, SignUpPage, LoginPage, UploadPage, PostPage } from "./pages"
import { useContext } from "react"
import { UserContext } from "./context/userContext"
import AppLoader from "./components/AppLoader"
import { PublicRoute, GuestRoute, ProtectedRoute } from "./components/routes"

const App: React.FC = () => {
  const location = useLocation()
  const { currentUser } = useContext(UserContext)

  if (!currentUser.isLoaded) {
    return (
      <>
        <div className="flex items-center justify-center w-screen h-screen">
          <AppLoader />
        </div>
      </>
    )
  }

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <AppHeader />
      )}

      <main>
        <Switch>
          <PublicRoute exact path="/">
            <HomePage />
          </PublicRoute>
          <GuestRoute path="/signup">
            <SignUpPage />
          </GuestRoute>
          <GuestRoute path="/login">
            <LoginPage />
          </GuestRoute>
          <ProtectedRoute path="/upload">
            <UploadPage />
          </ProtectedRoute>
          <PublicRoute path="/posts/:id">
            <PostPage />
          </PublicRoute>
          <Route path="*"></Route>
        </Switch>
      </main>
    </>
  )
}

export default App

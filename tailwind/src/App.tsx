import { AppHeader } from "./components"
import { Switch, Route, useLocation } from "react-router-dom"
import { HomePage, SignUpPage, LoginPage, UploadPage, PostPage } from "./pages"
import { useContext } from "react"
import { UserContext } from "./context/userContext"
import AppLoader from "./components/AppLoader"

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
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/posts/:id">
            <PostPage />
          </Route>
          <Route path="*"></Route>
        </Switch>
      </main>
    </>
  )
}

export default App

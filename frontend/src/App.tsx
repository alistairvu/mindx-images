import { useLocation } from "react-router-dom"
import Spinner from "react-bootstrap/Spinner"
import { AppHeader } from "./components"
import { UserContext } from "./context/userContext"
import { HomePage, LogInPage, SignUpPage } from "./pages"
import { Switch, Route } from "react-router-dom"
import { useContext } from "react"

const App: React.FC = () => {
  const location = useLocation()
  const { isLoaded } = useContext(UserContext)

  if (!isLoaded) {
    return (
      <>
        {location.pathname !== "/signup" && location.pathname !== "/login" && (
          <AppHeader />
        )}

        <main>
          <Spinner animation="border" />
        </main>
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
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default App

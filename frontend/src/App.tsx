import { useLocation } from "react-router-dom"
import { AppHeader } from "./components"
import { UserProvider } from "./context/userContext"
import { HomePage, LogInPage, SignUpPage } from "./pages"
import { Switch, Route } from "react-router-dom"

const App: React.FC = () => {
  const location = useLocation()

  return (
    <UserProvider>
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
    </UserProvider>
  )
}

export default App

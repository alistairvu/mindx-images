import { AppHeader } from "./components"
import { Switch, Route, useLocation } from "react-router-dom"
import { HomePage, SignUpPage, LoginPage } from "./pages"

const App: React.FC = () => {
  const location = useLocation()

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
          <Route path="*"></Route>
        </Switch>
      </main>
    </>
  )
}

export default App

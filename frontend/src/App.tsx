import { AppHeader } from "./components"
import { Switch, Route } from "react-router-dom"
import { HomePage } from "./pages"

const App: React.FC = () => {
  return (
    <>
      <AppHeader />

      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
    </>
  )
}

export default App

import Container from "react-bootstrap/Container"
import { useLocation } from "react-router-dom"
import { AppHeader } from "./components"
import { UserProvider } from "./context/userContext"

const App: React.FC = () => {
  const location = useLocation()

  return (
    <UserProvider>
      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <AppHeader />
      )}

      <main>
        <Container className="text-center py-5">
          <h1>Welcome to React!</h1>
          <h3 style={{ fontSize: 30 }}>
            Get started by editing{" "}
            <code style={{ color: "red" }}>src/App.tsx</code>
          </h3>
        </Container>
      </main>
    </UserProvider>
  )
}

export default App

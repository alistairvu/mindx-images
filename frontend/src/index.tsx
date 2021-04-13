import { render } from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from "./context/userContext"
import { QueryClient, QueryClientProvider } from "react-query"
import "./styles/index.scss"

const queryClient = new QueryClient()

const rootElement = document.getElementById("root")
render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  rootElement
)

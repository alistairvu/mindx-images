import { render } from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from "./context/userContext"
import "./styles/index.css"

const rootElement = document.getElementById("root")
render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  rootElement
)

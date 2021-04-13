import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import { UserContext } from "../context/userContext"
import { useContext } from "react"

const AppHeader: React.FC = () => {
  const { currentUser, resetCurrentUser } = useContext(UserContext)

  const renderNav = () => {
    if (!currentUser.isLoggedIn) {
      return (
        <Nav className="me-auto">
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>
        </Nav>
      )
    }

    return (
      <Nav className="ms-auto">
        <NavDropdown
          title={`Welcome ${currentUser.user.email}`}
          id="nav-dropdown"
        >
          <LinkContainer to="/upload">
            <NavDropdown.Item>Upload</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={resetCurrentUser}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    )
  }

  return (
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MindX Images</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>{renderNav()}</Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppHeader

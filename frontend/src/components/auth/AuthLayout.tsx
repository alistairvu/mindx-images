import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useEffect, useContext, ReactNode } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/userContext"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      history.replace("/")
    }
  }, [history, currentUser.isLoggedIn])

  return (
    <div className="bg-light">
      <Container>
        <Row>
          <Col
            md={{ span: 6, offset: 3 }}
            className="vh-100 d-flex flex-column justify-content-center"
          >
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const Section: React.FC = ({ children }) => {
  return (
    <Card className="w-100 mb-4">
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}

AuthLayout.Section = Section

export default AuthLayout

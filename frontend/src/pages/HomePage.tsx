import HomeCard from "../components/home/HomeCard"
import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"
import useSWR from "swr"

const HomePage: React.FC = () => {
  const getPosts = async () => {
    try {
      const { data } = await axios.get("/api/posts")
      if (data.success) {
        return data
      }
    } catch (err) {
      console.log(err)
    }
  }

  const { data: postData } = useSWR("/api/posts", getPosts)
  console.log(postData)

  if (!postData) {
    return (
      <Container className="mt-3 d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </Container>
    )
  }

  return (
    <Container className="mt-3">
      <Row>
        {postData.posts.map((post: any) => (
          <Col lg={3} md={6} key={post._id}>
            <HomeCard
              createdBy={post.createdBy[0].email}
              description={post.description}
              imageUrl={post.imageUrl}
              title={post.title}
              id={post._id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default HomePage

import HomeCard from "../components/home/HomeCard"
import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/Container"
import Pagination from "react-bootstrap/Pagination"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axiosClient from "../api"
import { useRef, useState } from "react"
import { useQuery } from "react-query"

const HomePage: React.FC = () => {
  const pageCount = useRef<number>(1)
  const [page, setPage] = useState(1)

  const getPosts = async () => {
    const { data } = await axiosClient.get("/api/posts", {
      params: { page: page },
    })
    if (data.success) {
      pageCount.current = data.pageCount
      return data
    }
  }

  const { data: postData, isFetching } = useQuery(["posts", page], getPosts)
  console.log(postData)

  if (isFetching && !postData) {
    return (
      <Container className="mt-3 d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </Container>
    )
  }

  const renderPagination = () => {
    const paginations = []
    for (let i = 1; i <= pageCount.current; i++) {
      paginations.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      )
    }
    return paginations
  }

  return (
    <Container className="mt-3">
      <Row>
        {postData.posts ? (
          postData.posts.map((post: any) => (
            <Col lg={3} md={6} key={post._id}>
              <HomeCard
                createdBy={post.createdBy[0].email}
                description={post.description}
                imageUrl={post.imageUrl}
                title={post.title}
                id={post._id}
              />
            </Col>
          ))
        ) : (
          <h1>No posts - Create the first post here!</h1>
        )}
      </Row>
      <Pagination>{renderPagination()}</Pagination>
    </Container>
  )
}

export default HomePage

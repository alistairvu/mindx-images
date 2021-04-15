import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import { useParams } from "react-router-dom"

import axiosClient from "../api"
import { useQuery } from "react-query"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { PostCommentForm, PostCommentList } from "../components/post"
import { SocketContext } from "../context/socketContext"

const PostPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const { id: postId } = params

  const { currentUser } = useContext(UserContext)

  const socket = useContext(SocketContext)

  const showPost = async () => {
    try {
      const { data } = await axiosClient.get(`/api/posts/${postId}`)
      if (data.success) {
        return data.post
      }
    } catch (err) {
      console.log(err)
    }
  }

  const {
    data: postData,
    isLoading,
    error: postError,
    refetch: commentRefetch,
  } = useQuery(`/api/posts/${postId}`, showPost)

  useEffect(() => {
    socket.emit("join-room", postId)

    socket.on("new-comment", () => {
      console.log("New comment!")
      commentRefetch()
    })

    return () => socket.emit("leave-room", postId)
  }, [socket, postId, commentRefetch])

  if (isLoading) {
    return (
      <div className="container">
        <Spinner animation="border" />
      </div>
    )
  }

  if (postError) {
    return (
      <div className="px-4 py-2 my-1 text-red-500 bg-red-100 border border-red-500 rounded-md">
        {postError}
      </div>
    )
  }

  return (
    <Container className="my-2">
      <Row>
        <Col md={8} className="text-center">
          <img
            src={postData.imageUrl}
            alt={postData.title}
            style={{ maxHeight: 360, maxWidth: "100%" }}
          />
        </Col>
        <Col md={4}>
          <PostCommentList comments={postData.comments} />
          {currentUser.isLoggedIn && (
            <PostCommentForm refetch={commentRefetch} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default PostPage

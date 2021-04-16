import Spinner from "react-bootstrap/Spinner"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import { useParams } from "react-router-dom"

import axiosClient from "../api"
import { useQuery, useQueryClient } from "react-query"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { PostCommentForm, PostCommentList } from "../components/post"
import { SocketContext } from "../context/socketContext"

const PostPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const { id: postId } = params

  const { currentUser } = useContext(UserContext)

  const socket = useContext(SocketContext)
  const queryClient = useQueryClient()

  const showPost = async () => {
    const { data } = await axiosClient.get(`/api/posts/${postId}`)
    if (data.success) {
      return data.post
    }
  }

  const { data: postData, isLoading, error: postError } = useQuery(
    ["post", postId],
    showPost
  )

  useEffect(() => {
    socket.emit("join-room", postId)

    socket.on("new-comment", (comment: any) => {
      queryClient.setQueryData(["post", postId], (prev: any) => {
        console.log(prev)
        return {
          ...prev,
          comments: [...prev.comments, comment],
        }
      })
    })

    return () => socket.emit("leave-room", postId)
  }, [socket, postId, queryClient])

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
          {currentUser.isLoggedIn && <PostCommentForm />}
        </Col>
      </Row>
    </Container>
  )
}

export default PostPage

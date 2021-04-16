import axiosClient from "../../api"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const PostCommentForm: React.FC = () => {
  const [content, setContent] = useState<string>("")
  const params = useParams<{ id: string }>()
  const { id: postId } = params

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const comment = {
        postId,
        content,
      }
      const { data } = await axiosClient.post("/api/comments", { comment })
      console.log(data)

      if (data.success) {
        setContent("")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form className="p-2" onSubmit={handleSubmit}>
      <Form.Control
        className="mb-2"
        type="text"
        placeholder="Enter your comment..."
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        required
      />
      <Button variant="primary" type="submit">
        Add comment
      </Button>
    </Form>
  )
}

export default PostCommentForm

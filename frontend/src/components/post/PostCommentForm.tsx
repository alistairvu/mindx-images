import axiosClient from "../../api"
import { useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useMutation, useQueryClient } from "react-query"
import { useForm } from "react-hook-form"

const PostCommentForm: React.FC = () => {
  const params = useParams<{ id: string }>()
  const { id: postId } = params
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ content: string }>()

  const queryClient = useQueryClient()

  const handleAddComment = async ({ content }: { content: string }) => {
    try {
      const comment = {
        postId,
        content,
      }
      const { data } = await axiosClient.post("/api/comments", { comment })

      if (data.success) {
        reset()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useMutation(handleAddComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId])
    },
  })

  return (
    <Form className="p-2" onSubmit={handleSubmit(handleAddComment)}>
      <Form.Group className="mb-2" controlId="content">
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="Enter your comment..."
          {...register("content", { required: true })}
        />
        {errors.content && (
          <Form.Text className="text-danger">
            {errors.content.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Add comment
      </Button>
    </Form>
  )
}

export default PostCommentForm

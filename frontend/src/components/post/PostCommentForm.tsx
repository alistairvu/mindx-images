import axiosClient from "../../api"
import { useState } from "react"
import { useParams } from "react-router-dom"

interface PostCommentFormProps {
  refetch: any
}

const PostCommentForm: React.FC<PostCommentFormProps> = ({ refetch }) => {
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
        refetch()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="p-2 space-y-2 rounded-md shadow" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Enter your comment..."
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        required
      />
      <button className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500">
        Add comment
      </button>
    </form>
  )
}

export default PostCommentForm

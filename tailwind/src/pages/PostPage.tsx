import { useParams } from "react-router-dom"
import axios from "axios"
import { AppLoader } from "../components"
import useSWR from "swr"
import { PostCommentList } from "../components/post"

const PostPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const { id: postId } = params

  const showPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}`)
      if (data.success) {
        return data.post
      }
    } catch (err) {
      console.log(err)
    }
  }

  const { data: postData } = useSWR(`/api/posts/${postId}`, showPost)

  if (!postData) {
    return (
      <div className="container">
        <AppLoader />
      </div>
    )
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <figure className="md:col-span-2">
          <img src={postData.imageUrl} alt={postData.title} />
        </figure>
        <section className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">Comments</h1>
            <PostCommentList comments={postData.comments} />
          </div>
          <form className="p-2 shadow rounded-md space-y-2">
            <input
              className="input"
              type="text"
              placeholder="Enter your comment..."
            />
            <button className="font-semibold text-white py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg">
              Add comment
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default PostPage

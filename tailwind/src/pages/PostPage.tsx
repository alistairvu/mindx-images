import { useParams } from "react-router-dom"
import axiosClient from "../api"
import { AppLoader } from "../components"
import { useQuery } from "react-query"
import { PostCommentList, PostCommentForm } from "../components/post"
import { useContext } from "react"
import { UserContext } from "../context/userContext"

const PostPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const { id: postId } = params

  const { currentUser } = useContext(UserContext)

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
  } = useQuery(`posts-${postId}`, showPost)

  if (isLoading) {
    return (
      <div className="container">
        <AppLoader />
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
    <div className="container">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <figure className="md:col-span-2">
          <img src={postData.imageUrl} alt={postData.title} />
        </figure>
        <section className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">Comments</h1>
            <PostCommentList comments={postData.comments} />
          </div>
          {currentUser.isLoggedIn && (
            <PostCommentForm refetch={commentRefetch} />
          )}
        </section>
      </div>
    </div>
  )
}

export default PostPage

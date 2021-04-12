import { HomeCard, HomePagination } from "../components/home"
import { AppLoader } from "../components"
import axiosClient from "../api"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"

const HomePage: React.FC = () => {
  const location = useLocation()
  const URLParams = new URLSearchParams(location.search)
  const page = Number(URLParams.get("page")) || 1
  const pageSize = 4

  const getPosts = async () => {
    try {
      const { data } = await axiosClient.get("/api/posts", {
        params: { page: page, pageSize: pageSize },
      })
      if (data.success) {
        return data
      }
    } catch (err) {
      console.log(err)
    }
  }

  const { data: postData, isLoading, error: postError } = useQuery(
    ["/api/posts", page],
    getPosts
  )

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {postData.posts.map((post: any) => (
          <HomeCard
            createdBy={post.createdBy[0].email}
            description={post.description}
            imageUrl={post.imageUrl}
            title={post.title}
            id={post._id}
          />
        ))}
      </div>
      <HomePagination
        pageCount={postData.pageCount}
        pageNumber={postData.pageNumber}
      />
    </div>
  )
}

export default HomePage

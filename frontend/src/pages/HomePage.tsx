import { HomeCard } from "../components/home"
import { AppLoader } from "../components"
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
      <div className="container">
        <AppLoader />
      </div>
    )
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  )
}

export default HomePage

import { Link } from "react-router-dom"

interface HomeCardProps {
  createdBy: string
  imageUrl: string
  title: string
  description: string
  id: string
}

const HomeCard: React.FC<HomeCardProps> = (props) => {
  return (
    <div className="w-full bg-white shadow-md rounded-md space-y-2">
      <Link to={`/posts/${props.id}`}>
        <img src={props.imageUrl} alt="" className="rounded-t-md w-full" />
      </Link>
      <div className="py-2 px-4 space-y-4">
        <div className="space-y-1">
          <Link to={`/posts/${props.id}`}>
            <h1 className="text-xl font-semibold text-blue-600 hover:text-blue-500">
              {props.title}
            </h1>
          </Link>
          <p>{props.description}</p>
        </div>
        <p className="text-gray-400">{props.createdBy}</p>
      </div>
    </div>
  )
}

export default HomeCard

import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"

export interface PostInterface {
  id: string
  imageUrl: string
  title: string
  description: string
  createdBy: string
}

const PostCard: React.FC<PostInterface> = ({
  id,
  imageUrl,
  title,
  description,
  createdBy,
}) => {
  return (
    <Card className="mb-2">
      <Link to={`/post/${id}`}>
        <Card.Img variant="top" src={imageUrl} style={{ cursor: "pointer" }} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/post/${id}`}>{title}</Link>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="text-muted">{createdBy}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostCard

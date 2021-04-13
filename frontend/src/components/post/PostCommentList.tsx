interface CommentInterface {
  content: string
  createdBy: {
    email: string
  }
  _id: string
}

interface PostCommentListProps {
  comments: CommentInterface[]
}

const PostCommentList: React.FC<PostCommentListProps> = ({ comments }) => {
  return (
    <ul
      className="mt-1 overflow-scroll"
      style={{ listStyleType: "none", padding: 0, height: 330 }}
    >
      {comments.map((comment) => (
        <li key={comment._id}>
          <span className="fw-bold">{comment.createdBy.email}:</span>{" "}
          {comment.content}
        </li>
      ))}
    </ul>
  )
}

export default PostCommentList

interface CommentInterface {
  content: string
  createdBy: {
    email: string
  }
}

interface PostCommentListProps {
  comments: CommentInterface[]
}

const PostCommentList: React.FC<PostCommentListProps> = ({ comments }) => {
  return (
    <ul className="overscroll-y-contain">
      {comments.map((comment) => (
        <li>
          <span className="font-semibold">{comment.createdBy.email}:</span>{" "}
          {comment.content}
        </li>
      ))}
    </ul>
  )
}

export default PostCommentList

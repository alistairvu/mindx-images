import mongoose from "mongoose"

interface CommentSchemaInterface extends mongoose.Document {
  content: string
  createdBy: mongoose.Types.ObjectId
  post: mongoose.Types.ObjectId
}

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model<CommentSchemaInterface>("comment", CommentSchema)

import mongoose from "mongoose"

interface PostSchemaInterface extends mongoose.Document {
  imageUrl: string
  title: string
  description?: string
  createdBy: mongoose.Schema.Types.ObjectId
  comments: any[]
}

const PostSchema = new mongoose.Schema<PostSchemaInterface>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

PostSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "post",
})

export default mongoose.model<PostSchemaInterface>("post", PostSchema)

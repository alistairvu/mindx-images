import mongoose from "mongoose"
import bcrypt from "bcryptjs"

export interface UserSchemaInterface extends mongoose.Document {
  email: string
  password: string
  refreshTokens: string[]
  checkPassword: (password: string) => boolean
}

const UserSchema = new mongoose.Schema<UserSchemaInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

UserSchema.index({
  email: 1,
})

UserSchema.pre("save", function (this: UserSchemaInterface, next: any) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
  next()
})

UserSchema.methods.checkPassword = function (
  this: UserSchemaInterface,
  password: string
) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model<UserSchemaInterface>("user", UserSchema)

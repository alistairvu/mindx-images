import express from "express"
import {
  createUser,
  loginUser,
  checkStatus,
  logoutUser,
} from "./auth.controller"

const router = express.Router()

router.route("/signup").post(createUser)
router.route("/login").post(loginUser)
router.route("/status").get(checkStatus)
router.route("/logout").delete(logoutUser)

export default router

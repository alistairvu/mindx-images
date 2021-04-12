import express from "express"
import { createUser, loginUser, logoutUser } from "./auth.controller"
import { getLoginStatus } from "./status.controller"
import { refreshAccessToken } from "./refresh.controller"

const router = express.Router()

router.route("/signup").post(createUser)
router.route("/login").post(loginUser)
router.route("/status").get(getLoginStatus)
router.route("/logout").delete(logoutUser)
router.route("/refresh").get(refreshAccessToken)

export default router

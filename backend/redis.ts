import redis from "redis"
import dotenv from "dotenv"

dotenv.config()

const redisClient = redis.createClient("http://localhost:6379")

redisClient.on("connect", () => {
  console.log("Redis plugged in")
})

export default redisClient

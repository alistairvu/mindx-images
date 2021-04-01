import redis from "redis"
import dotenv from "dotenv"

dotenv.config()

const redisClient = redis.createClient(process.env.REDIS_URL)

redisClient.on("connect", () => {
  console.log("Redis plugged in")
})

export default redisClient

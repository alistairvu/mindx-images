import { promisify } from "util"
import redis from "redis"

const client = redis.createClient(process.env.REDIS_URL)

export const saddAsync = promisify(client.sadd).bind(client)
export const sismemberAsync = promisify(client.sismember).bind(client)
export const sremAsync = promisify(client.srem).bind(client)

export default client

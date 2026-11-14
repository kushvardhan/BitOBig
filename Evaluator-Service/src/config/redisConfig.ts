import Redis from "ioredis";
import serverConfig from "./serverConfig";

const redisConfig = new Redis({
    host: serverConfig.REDIS_HOST,
    port: serverConfig.REDIS_PORT,
    maxRetriesPerRequest: null,
});

export default redisConfig;

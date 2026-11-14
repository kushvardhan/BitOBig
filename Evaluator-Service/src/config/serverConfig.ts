import dotenv from "dotenv";

dotenv.config();

const serverConfig = {
    PORT: process.env.PORT || 3001,
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6373
}

export default serverConfig;
module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo", // see redis notes
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    REDIS_URL: process.env.REDIS_URL || "redis", // redis references the service name in the docker-compose file. the environment variable is there in case we don't use a dockerized redis service (it's hosted elseware) this is same for MONGO IP 
    REDIS_PORT: process.env.REDIS_PORT || 6379, // default port for redis. OR whatever environment variable we pass
    SESSION_SECRET: process.env.SESSION_SECRET
};
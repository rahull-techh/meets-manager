const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (error) => {
    console.error("Reddis error:", error);
});

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected successfully");
};

module.exports = {
    redisClient,
    connectRedis
};
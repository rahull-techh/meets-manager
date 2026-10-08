require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const connectDatabase = require("./config/database");
const { connectRedis } = require("./config/redis");
const registerSocketHandlers = require("./socket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Realtime server is running"
    });
});

connectDatabase();
connectRedis();

registerSocketHandlers(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Realtime server running on PORT ${PORT}`);
});
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDatabase = require("./config/database");
require("dotenv").config();

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

const PORT = process.env.PORT || 5000;

connectDatabase();

io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    console.log("Client connected:", socket.id);
    console.log("User ID:", userId);

    socket.join(`user:${userId}`);

    console.log(`User joined room: user:${userId}`);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Realtime server running on PORT: ${PORT}`);
});
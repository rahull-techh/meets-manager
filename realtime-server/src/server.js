require("dotenv").config();
const express = require("express");
const http = require("http");
const Message = require("./models/message");
const { Server } = require("socket.io");
const { redisClient, connectRedis } = require("./config/redis");
const connectDatabase = require("./config/database");

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
connectRedis();

io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    console.log("Client connected:", socket.id);
    console.log("User ID:", userId);

    socket.join(`user:${userId}`);

    socket.on("meeting:join", async (meetingId) => {
        socket.join(`meeting:${meetingId}`);
        await redisClient.sAdd(
            `meeting:${meetingId}:users`,
            userId
        );
        io.to(`meeting:${meetingId}`).emit("participant:joined", {
            userId,
        });

        console.log(
            `User ${userId} joined meeting: ${meetingId}`
        );

        socket.on("meeting:leave", async (meetingId) => {
            if (!meetingId) {
                return;
            }

            socket.leave(`meeting:${meetingId}`);

            await redisClient.sRem(
                `meeting:${meetingId}:users`,
                userId
            );

            io.to(`meeting:${meetingId}`).emit("participant:left", {
                userId,
            });

            console.log(
                `User ${userId} left meeting: ${meetingId}`
            );
        });

        try {
            const messages = await Message.find({ meetingId })
                .sort({ createdAt: 1 })
                .limit(50);

            socket.emit("message:history", messages);

        } catch (error) {
            console.error("Failed to fetch message history:", error);
        }
    });

    socket.on("message:send", async ({ meetingId, message }) => {
        if (!meetingId || !message) {
            return;
        }

        try {
            const newMessage = await Message.create({
                meetingId,
                userId,
                message,
            });

            console.log(
                `Message from ${userId} in meeting ${meetingId}: ${message}`
            );

            io.to(`meeting:${meetingId}`).emit("message:new", {
                id: newMessage._id,
                meetingId: newMessage.meetingId,
                userId: newMessage.userId,
                message: newMessage.message,
                createdAt: newMessage.createdAt,
            });
        } catch (error) {
            console.error("Failed to save message:", error);
        }
});

    console.log(`User joined room: user:${userId}`);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Realtime server running on PORT: ${PORT}`);
});
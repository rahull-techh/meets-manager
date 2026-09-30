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

server.listen(PORT, () => {
    console.log(`Realtime server running on PORT: ${PORT}`);
});
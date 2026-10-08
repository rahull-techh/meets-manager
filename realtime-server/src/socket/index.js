const registerMeetingHandlers = require("./meeting");
const registerChatHandlers = require("./chat");
const registerWebRTCHandlers = require("./webrtc");

const { redisClient } = require("../config/redis");

function registerSocketHandlers(io) {

    io.on("connection", (socket) => {

        const userId = socket.handshake.auth.userId;

        socket.join(`user:${userId}`);

        socket.data.meetings = new Set();

        registerMeetingHandlers(
            io,
            socket,
            redisClient
        );

        registerChatHandlers(
            io,
            socket
        );

        registerWebRTCHandlers(
            io,
            socket
        );

    });

}

module.exports = registerSocketHandlers;
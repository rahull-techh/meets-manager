const Message = require("../models/message");

function registerChatHandlers(io, socket) {

    const userId = socket.handshake.auth.userId;

    socket.on("message:send", async ({ meetingId, message }) => {

        if (!meetingId || !message) return;

        const newMessage = await Message.create({
            meetingId,
            userId,
            message
        });

        io.to(`meeting:${meetingId}`).emit("message:new", {
            id: newMessage._id,
            meetingId: newMessage.meetingId,
            userId: newMessage.userId,
            message: newMessage.message,
            createdAt: newMessage.createdAt
        });

    });

}

module.exports = registerChatHandlers;
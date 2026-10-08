function registerWebRTCHandlers(io, socket) {

    const userId = socket.handshake.auth.userId;

    socket.on("webrtc:offer", ({ targetUserId, offer }) => {

        io.to(`user:${targetUserId}`).emit("webrtc:offer", {
            fromUserId: userId,
            offer
        });

    });

    socket.on("webrtc:answer", ({ targetUserId, answer }) => {

        io.to(`user:${targetUserId}`).emit("webrtc:answer", {
            fromUserId: userId,
            answer
        });

    });

    socket.on("webrtc:ice-candidate", ({ targetUserId, candidate }) => {

        io.to(`user:${targetUserId}`).emit("webrtc:ice-candidate", {
            fromUserId: userId,
            candidate
        });

    });
}

module.exports = registerWebRTCHandlers;
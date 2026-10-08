function registerMeetingHandlers(io, socket, redisClient) {

    const userId = socket.handshake.auth.userId;

    socket.on("meeting:join", async (meetingId) => {

        socket.join(`meeting:${meetingId}`);

        await redisClient.sAdd(
            `meeting:${meetingId}:users`,
            userId
        );

        await redisClient.sAdd(
            `meeting:${meetingId}:user:${userId}:sockets`,
            socket.id
        );

        socket.data.meetings.add(meetingId);

        socket.to(`meeting:${meetingId}`).emit(
            "participant:joined",
            { userId }
        );

    });

}

module.exports = registerMeetingHandlers;
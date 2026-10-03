const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        meetingId: {
            type: String,
            required: true,
        },

        userId: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
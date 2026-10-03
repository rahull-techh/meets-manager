const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Mongo connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed", error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase
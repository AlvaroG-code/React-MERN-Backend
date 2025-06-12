const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database connection failed");
        process.exit(1); // Exit the process with failure
    }
};

module.exports = {
    dbConnection,
};

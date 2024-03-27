const mongoose = require("mongoose");

const MongoConnection = async () => {
  try {
    const connection = await mongoose.connect("mongodb://localhost:23000/LinkedInRecords");
    console.log(connection.connections[0].readyState)
    if (connection.connections[0].readyState === 1) {
      console.log("MongoDB connected successfully");
    } else {
      throw new Error("MongoDB connection failed");
    }
    return connection.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; 
  }
};

module.exports = MongoConnection;

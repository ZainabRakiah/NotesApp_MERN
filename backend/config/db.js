/**
 * DATABASE CONNECTION
 * -------------------
 * Mongoose is an ODM (Object Data Modeling) library for MongoDB.
 * It lets us define schemas (structure) for our data and interact
 * with MongoDB using JavaScript objects instead of raw queries.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.connect() returns a Promise, so we use async/await
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;

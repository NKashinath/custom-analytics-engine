const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {maxPoolSize:10})
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Connection error:", error)
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

module.exports = dbConnection;
const mongoose = require("mongoose");

const connectToDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("successfully connected to db");
  } catch (error) {
    console.error("failed to connect to db", error);
  }
};

module.exports = connectToDb;

const mongoose = require("mongoose");
const { mongoDbUrl } = require("../secret");

const connectDb = async () => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log("conection to db is successfully");
  } catch (error) {
    console.error(`could not connect to db`, error.message);
  }
  mongoose.connection.on("error", (error) => {
    console.error(`db connection error`, error.message);
  });
};
module.exports = connectDb;

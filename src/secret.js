require("dotenv").config();

const port = process.env.SERVER_PORT || 3002;
const mongoDbUrl = process.env.MONGODB_URL;

module.exports = { port, mongoDbUrl };

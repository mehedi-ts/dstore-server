require("dotenv").config();

const port = process.env.SERVER_PORT || 3002;
const mongoDbUrl = process.env.MONGODB_URL;
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

module.exports = { port, mongoDbUrl, jwtPrivateKey };

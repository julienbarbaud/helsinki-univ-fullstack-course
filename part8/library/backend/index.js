require("dotenv").config();
const startServer = require("./server");
const connectToDb = require("./db");

startServer(process.env.PORT);
connectToDb(process.env.MONGODB_URL);

const app = require("./app.js");
const connectDb = require("./config/db.js");
const { port } = require("./secret.js");

app.listen(port, async () => {
  console.log(`app is runing on port : ${port}`);
  await connectDb();
});

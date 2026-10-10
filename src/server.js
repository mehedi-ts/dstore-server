const app = require("./app.js");
const { port } = require("./secret.js");

app.listen(port, () => {
  console.log(`app is runing on port : ${port}`);
});

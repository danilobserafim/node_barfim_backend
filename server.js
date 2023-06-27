const app = require("./app");
const http = require("http");
const server = http.createServer(app);

server.listen(3000, () => {
  console.log("tudo certo na porta 3000");
});

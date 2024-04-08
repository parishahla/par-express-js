import ParExpress from "./letsPlayServer.js";

const app = ParExpress();

app.listen(3000);
app.router.get("/par", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, this is the letsPlay!");
});

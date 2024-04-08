import ParExpress from "./server.js";

const app = ParExpress();

app.listen(3000);

app.router.use((req, res, next) => {
  console.log("middleware 1");
  next();
});

app.router.use((req, res, next) => {
  console.log("middleware 2");
  next();
});

app.router.use((req, res, next) => {
  console.log("middleware 3");
  next();
});

app.router.use((req, res, next) => {
  console.log("middleware 4");
});

app.router.use((req, res, next) => {
  console.log("middleware 5");
});

app.router.get("/par", (req, res) => {
  console.log("made it to the get");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, this is the letsPlay!");
});

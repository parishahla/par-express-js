import ParExpress from "./server.js";

const app = ParExpress();

app.listen(3000);

app.router.use((req, res, next) => {
  console.log("middleware 0");
  next();
});

app.router.use((req, res, next) => {
  next();
});

app.router.use((req, res, next) => {
  console.log("middleware 2");
});

app.router.use((req, res, next) => {
  console.log("middleware 3");
});

app.router.use((req, res, next) => {
  console.log("middleware 4");
});

app.router.get("/par", (req, res) => {
  console.log(req.query);
  console.log("it's /par");
  //   res.send("yeah I'm res.send");
  res.json({ foo: "bar" });
});

app.router.get("/pari", (req, res) => {
  res.redirect("/par");
  // res.json({ par: "par.json" });
  // res.end("Hello from /pari");`
});

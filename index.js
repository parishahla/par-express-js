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
  //   console.log(req.query);
  //   res.send("yeah I'm res.send");
  res.json({ foo: "bar.json" });
});

app.router.get("/pari", (req, res) => {
  res.redirect("/par");
  //   res.json({ par: "par.json" });
  //   res.end("Hello from /pari");
});

import http from "http";
import Router from "./router.js";
const ParExpress = () => {
  const router = new Router();

  let server = http.createServer((req, res) => {
    router.handleRequest(req, res);
  });

  function listen(port) {
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
  return { server, listen, router };
};

export default ParExpress;

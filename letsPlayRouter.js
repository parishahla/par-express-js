class Router {
  constructor() {
    this.routes = {};
  }

  get(path, handler) {
    this.routes[path] = handler;
  }

  post(path, handler) {
    this.routes[path] = handler;
  }

  put(path, handler) {
    this.routes[path] = handler;
  }

  delete(path, handler) {
    this.routes[path] = handler;
  }

  handleRequest(req, res) {
    const { url, method } = req;
    const handler = this.routes[url];
    if (handler) {
      // Invoke the handler
      handler(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
}

export default Router;

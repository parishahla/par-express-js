import queryParse from "./query.parser.js";
import FileServer from "./file.server.js";

//! private functions
class Router {
  constructor() {
    this.routes = {};
    this.middleware = [];
    this.index = -1;
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

  use(middleware) {
    this.middleware.push(middleware);
  }

  executeMiddleware(req, res) {
    const next = () => {
      this.index++;
      if (this.index < this.middleware.length) {
        this.middleware[this.index](req, res, next);
      } else {
        this.index = -1;
        this.handleRequest(req, res);
      }
    };
    // recursive function
    next();
  }

  handleRequest(req, res) {
    const { url } = req;
    res = this.createResponse(res);

    this.executeMiddleware(req, res);

    if (url.includes("/public")) {
      this.index = -1;
      return FileServer.serveFile(req, res);
    }

    const parsedRoute = queryParse(url);

    //! pattern check
    if (url.includes("?")) {
      return res.json(parsedRoute);
    }

    const handler = this.routes[url];
    if (handler) {
      handler(req, res);
    } else {
      this.index = -1;
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }

  createResponse(res) {
    res.send = (message) => {
      this.index = -1;
      res.end(message);
    };

    res.json = (message) => {
      this.index = -1;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(message));
    };

    res.redirect = (url) => {
      this.index = -1;
      res.writeHead(302, { Location: `${url}` });
      res.end();
    };
    return res;
  }
}

export default Router;

import queryParse from "./query-parser.js";
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

  //! has to stop
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

  //? maybe add the method ( as uppercase letters) as well
  handleRequest(req, res) {
    const { url } = req;
    req.query = queryParse(url);
    res = createResponse(res);
    const handler = this.routes[url];
    if (handler) {
      this.executeMiddleware(req, res);
      handler(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
}

function createResponse(res) {
  res.send = (message) => res.end(message);

  res.json = (message) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(message));
  };

  res.redirect = (url) => {
    res.writeHead(302, { Location: `${url}` });
    res.end();
  };
  return res;
}
export default Router;

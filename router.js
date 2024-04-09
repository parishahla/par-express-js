import queryParse from "./query.parser.js";
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
      if (this.index <= this.middleware.length) {
        this.middleware[this.index](req, res, next);
      } else {
        this.index = -1;
        // this.handleRequest(req, res);
      }
    };
    // recursive function
    next();
  }

  //? maybe add the method ( as uppercase letters) as well
  handleRequest(req, res) {
    const { url } = req;
    req.query = queryParse(url);
    res = this.createResponse(res);
    //!
    this.executeMiddleware(req, res);
    const handler = this.routes[url];
    if (handler) {
      //!
      handler(req, res);
    } else {
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
      res.setHeader("Content-Type", "application/json");
      this.index = -1;
      res.end(JSON.stringify(message));
    };

    res.redirect = (url) => {
      res.writeHead(302, { Location: `${url}` });
      this.index = -1;
      res.end();
    };
    return res;
  }
}

export default Router;

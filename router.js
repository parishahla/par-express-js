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
    const handler = this.routes[url];
    if (handler) {
      handler(req, res);
      this.executeMiddleware(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
}

export default Router;

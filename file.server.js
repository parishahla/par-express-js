import fs from "fs";

class StaticFileServer {
  serveFile(req, res) {
    const filePath = "." + req.url;

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Internal server error");
        return;
      }

      res.writeHead(200);
      res.end(data);
    });
  }
}

export default new StaticFileServer();

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StaticFileServer {
  serveFile(req, res) {
    let fullPath = req.url;
    fullPath = path.join(__dirname, fullPath);

    fs.readFile(fullPath, (err, data) => {
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

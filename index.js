const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // dynamic file path
  const filePath = path.join(
    __dirname,
    "public",
    req.url == "/" ? "index.html" : req.url
  );
  // console.log(filePath);

  // get file Extension
  let extname = path.extname(filePath);
  // console.log(extname);

  // content type
  let contentType = "text/html"; //default

  // check extension type then switch to the correct content type.
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

// serve pages

server.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

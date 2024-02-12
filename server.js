const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const backend = require("./backend/index");
app.prepare().then(() => {
  const mainServer = express();

  // mainServer.get("/", (req, res) => {
  //   return res.send("All");
  // });

  mainServer.use((req, res, next) => {
    const hostName = req.hostname;
    const subdomain = hostName.split(".")[0];
    console.log(subdomain);
    if (subdomain === "api") {
      next();
    } else {
      return handle(req, res);
    }
  });

  mainServer.use("/", backend);

  mainServer.listen(port, (err) => {
    if (err) throw err;

    console.log(`> Ready on http://localhost:${port}`);
  });
});

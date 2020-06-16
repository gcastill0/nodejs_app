const express = require("express");
const app = express();
const config = require("./config.json");
const bodyParser = require("body-parser");

// pug view
app.set("view engine", "pug");
// public
app.use(express.static("public"));
// middlewares
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/", require("./routes"));

app.listen(config.port, () => console.log(`Server running on ${config.port}`));

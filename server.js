const express = require("express");
const path = require("path");

const app = express();

app.use("/css", express.static(path.resolve(__dirname, "ui", "css")));
app.use("/js", express.static(path.resolve(__dirname, "ui", "js")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "ui", "index.html"));
});

app.listen(8080, '127.0.0.1');

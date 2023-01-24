const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./connection");
const app = express();
require("dotenv").config();
const path = require("node:path");
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const hikesRouter = require("./routes/hikes");
app.use("/hikes", hikesRouter);

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const bulletinRoutes = require("./routes/bulletin");

app.use("/feed", bulletinRoutes);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}! You better go catch it`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const PORT = process.env.PORT || 5500;

const db = mysql.createPool({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: "TraVerseDB",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const hikesRouter = require("./routes/hikes");
app.use("/hikes", hikesRouter);

app.use(express.json());

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/feed", (req, res) => {
  const q = "SELECT * FROM feed";
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/feed"),
  (req, res) => {
    const userName = req.body.userName;
    const hikeName = req.body.hikeName;
    const userMessage = req.body.userMessage;

    const sqlInsert =
      "INSERT INTO bulletin_feed (userName, hikeName, userMessage) VALUES (?,?)";
    db.query(sqlInsert, [userName, hikeName, userMessage], (err, result) => {
      console.log(err);
    });
  };

app.delete("/feed/:id", (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM  WHERE id = ?";

  db.query(q, postId, (err, result) => {
    if (err) return res.json(err);
    return res.json("Post was successfully deleted");
  });
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}! You better go catch it`);
});

const express = require("express");
const router = express.Router();
const db = require("../connection");
router.use(express.json());

router.get("/", (req, res) => {
  const q = "SELECT * FROM bulletin_feed";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/create", (req, res) => {
  const userName = req.body.userName;
  const hikeName = req.body.hikeName;
  const userMessage = req.body.userMessage;

  const q =
    "INSERT into bulletin_feed (userName, hikeName, userMessage) VALUES (?,?,?)";
  db.query(q, [userName, hikeName, userMessage], (err, result) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM bulletin_feed WHERE id = ?";

  db.query(q, postId, (err, result) => {
    if (err) return res.json(err);
    return res.json("Post was successfully deleted");
  });
});

module.exports = router;

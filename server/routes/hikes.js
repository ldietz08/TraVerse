const express = require("express");
const path = require("node:path");
const router = express.Router();
const cors = require("cors");

router.use(express.json());
router.use(cors());

const hikesJSONFile = path.join(__dirname, "../data/hikes.json");
const hikes = require(hikesJSONFile);

router.get("/", (_req, res) => {
  try {
    res.status(200).json(hikes);
  } catch (error) {
    console.log("Error retrieving hikes", error);
  }
});

router.get("/:id", (req, res) => {
  const found = hikes.find((hike) => hike.id === req.params.id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: `Hike with ID ${req.params.id} not found` });
  }
});

module.exports = router;

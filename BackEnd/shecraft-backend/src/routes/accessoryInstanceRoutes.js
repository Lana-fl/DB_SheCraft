const router = require("express").Router();
const {
  createAccessory,
  cancelAccessory,
} = require("../controllers/accessoryInstanceController");

// create accessory instance
router.post("/", createAccessory);

// cancel accessory reservation (release qty back)
router.post("/:accessoryID/cancel", cancelAccessory);

module.exports = router;

const router = require("express").Router();
const upload = require("../middleware/upload-photo");
const Owner = require("../models/owner");

// POST request - create a new owner
router.post("/owners", upload.single("photo"), async (req, res) => {
  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();
    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// GET request - get all owners
router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();
    res.json({
      success: true,
      owners: owners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;

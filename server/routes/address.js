const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");
const axios = require("axios");
//   Post request
router.post("/addresses", verifyToken, async (req, res) => {
  try {
    let address = new Address();
    address.user = req.decoded._id;
    address.country = req.body.country;
    address.fullName = req.body.fullName;
    address.streetAddress = req.body.streetAddress;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.phoneNumber = req.body.phoneNumber;
    address.deliveryInstructions = req.body.deliveryInstructions;
    address.securityCode = req.body.securityCode;

    await address.save();
    res.json({
      success: true,
      message: "Successfully added an address",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get  all addresses

router.get("/addresses", verifyToken, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      addresses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
//  Get single address
router.get("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.findOne({ _id: req.params.id });
    res.json({
      success: true,
      address: address,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Put requests
router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let foundAddress = await Address.findOne({ user: req.decoded._id });
    if (foundAddress) {
      if (req.body.country) foundAddress.country = req.body.country;
      if (req.body.fullName) foundAddress.fullName = req.body.fullName;
      if (req.body.streetAddress)
        foundAddress.streetAddress = req.body.streetAddress;
      if (req.body.city) foundAddress.city = req.body.city;
      if (req.body.state) foundAddress.state = req.body.state;
      if (req.body.zipCode) foundAddress.zipCode = req.body.zipCode;
      if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliveryInstructions)
        foundAddress.deliveryInstructions = req.body.deliveryInstructions;
      if (req.body.securityCode)
        foundAddress.securityCode = req.body.securityCode;

      await foundAddress.save();
      res.json({
        success: true,
        message: "Address saved successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//  Delete request for address
router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let deletedAddress = await Address.findByIdAndDelete({
      _id: req.params.id,
    });

    if (deletedAddress) {
      res.json({
        success: true,
        message: "Address deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Put API set default address

router.put("/addresses/set/default", verifyToken, async (req, res) => {
  try {
    const updatedAddressUser = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );
    if (updatedAddressUser) {
      res.json({
        success: true,
        message: "Successfully set this address as default",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//  get request for countries

router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    res.json(response.data);
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;

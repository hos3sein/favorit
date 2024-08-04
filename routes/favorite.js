const express = require("express");

const C = require("../controllers/favorite");

const { protect } = require("../middleware/auth");

const router = express.Router();

// POST

// ! ok
router.post("/addfavoriteorder", protect, C.createFavoriteOrder);
router.get("/getuserfavorite",protect ,C.getFavoriteUserOrder);
router.delete("/removefavoriteorder/:id", protect, C.deleteFavoriteOrder);
router.get("/getfavoriteorderadmin/:id", protect, C.getFavoriteUserOrderAdmin);




module.exports = router;

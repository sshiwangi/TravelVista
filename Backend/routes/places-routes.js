const express = require("express");
const { check } = require("express-validator");
const placesControllers = require("../controllers/places-controller");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

router.get("/", placesControllers.getAllPlaces);
//getting places by their id
router.get("/:pid", placesControllers.getPlaceById);
router.patch("/:pid/view", placesControllers.incrementViewCount);
//getting places by their creator
router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);
router.patch("/:pid/like", placesControllers.likePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;

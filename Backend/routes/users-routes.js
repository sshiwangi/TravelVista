const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/users-controllers");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");

//getting places by their id
router.get("/", usersControllers.getUsers);
router.get("/search", usersControllers.searchUsersByName);
router.get("/:uid", usersControllers.getUsersById);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);
router.post("/login", usersControllers.login);

module.exports = router;

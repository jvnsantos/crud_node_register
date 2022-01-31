const express = require("express");
const UserController = require("../controllers/User");

const userController = new UserController();

const router = express.Router();

router.route("/new").post(userController.create);
router.route("/search").get(userController.findUser);

module.exports = router;

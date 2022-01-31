const express = require("express");
const UserController = require("../controllers/UserController");

const userController = new UserController();

const router = express.Router();

router.route("/users/new").post(userController.createUser);
router.route("/users/search").get(userController.readUser);
router.route("/users/all").get(userController.readAllUser);
router.route("/users/delete").delete(userController.deleteUser);

module.exports = router;

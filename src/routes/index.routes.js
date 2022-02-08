const express = require("express");
const cors = require("cors")
const UserController = require("../controllers/UserController");

const userController = new UserController();

const router = express.Router();

const whitelist = ["*", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

router.route("/users/new").post(userController.createUser, cors(corsOptions));
router.route("/users/search").get(userController.readUser, cors(corsOptions));
router.route("/users/all").get(userController.readAllUser, cors(corsOptions));
router
  .route("/users/delete")
  .delete(userController.deleteUser, cors(corsOptions));

module.exports = router;

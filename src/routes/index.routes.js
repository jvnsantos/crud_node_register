const express = require("express");
const UserController = require("../controllers/UserController");
require("cors");

const userController = new UserController();

const router = express.Router();

// router.post("/register", async (req, res) => {
//   try {
//     const user = await userController.createUser(req, res);
//     return user;
//   } catch (error) {}
// });

router.get("/user", userController.readUser);

router.post("/logout", userController.disconnectUser);

router.post("/validate", userController.verifyJWT);

router.post("/auth", userController.authUser);

router.get("/users/all", userController.readAllUser);

router.route("/users/delete").delete(userController.deleteUser);

module.exports = (app) => app.use("/api", router);

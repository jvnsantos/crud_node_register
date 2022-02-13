const express = require("express");
const cors = require("cors");
const UserController = require("../controllers/UserController");

const userController = new UserController();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await userController.createUser(req, res);
    return user;
  } catch (error) {
    console.log("Erro no método POST___", error);
  }
});

router.get("/user", userController.readUser);

router.post("/auth", userController.authUser);

router.get("/users/all", userController.verifyJWT, userController.readAllUser);

router.route("/users/delete").delete(userController.deleteUser);

module.exports = (app) => app.use("/api", router);

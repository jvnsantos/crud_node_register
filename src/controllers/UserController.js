const User = require("../models/User");
const sanitizeString = require("../utils/sanitizeString");

class UserController {
  
  async readAllUser(req, res) {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (e) {
      res.status(404).json({ message: "Nenhum resultado encontrado." });
    }
  }

  async readUser(req, res) {
    const { userName } = req.body;

    if (!userName) {
      res.status(400).json({ message: `Usuário não informado` });
    }

    const user = await User.findOne({ userName });

    if (user) {
      try {
        res
          .status(200)
          .json({ message: `Usuário criado com sucesso`, data: user });
      } catch (error) {
        res.status(400).json({ error: error });
      }
    } else {
      res.status(404).json({ message: `Usuário não cadastrado` });
    }
  }

  async createUser(req, res) {
    const { firstName, lastName, userName, email, password } = req.body;

    const emailAlreadyExist = await User.findOne({ email });
    const userNameAlreadyExist = await User.findOne({ userName });

    if (emailAlreadyExist) {
      return res
        .status(400)
        .json({ message: `E-mail ${email} já está em uso` });
    }

    if (userNameAlreadyExist) {
      return res
        .status(400)
        .json({ message: `Nome de usuário já está em uso` });
    }

    try {
      const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
      });

      res
        .status(201)
        .json({ message: `Usuário criado com sucesso`, data: user });
    } catch (e) {
      return res.status(400).json({ message: "erro ao salvar no banco de dados", e });
    }
  }

  async deleteUser(req, res) {
    const { userName } = req.body;

    if (!userName) {
      res.status(400).json({ message: "Usuário não informado" });
    }

    try {
      await User.deleteOne({ userName });
      res
        .status(200)
        .json({ message: `Usuário ${userName} removido com sucesso` });
    } catch (error) {
      res.status(400).json({
        message: `Não foi possivel deletar usuario ${userName}`,
        error: error,
      });
    }
  }
}

module.exports = UserController;

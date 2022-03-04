const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv");

class UserController {
  async readAllUser(req, res) {
    try {
      const user = await User.find();
      res.status(200).json({ usuario: user });
    } catch (e) {
      res.status(404).json({ message: "Nenhum resultado encontrado." }).end();
    }
  }

  async authUser(req, res) {
    const { email, password } = req.body;

    const thisUser = await User.findOne({ email });

    if (!thisUser) {
      return res.status(404).send("E-mail não cadastrado");
    }

    try {
      if (await bcrypt.compare(password, thisUser.password)) {
        const token = jwt.sign({ user: thisUser }, process.env.SECRET_KEY, {
          expiresIn: 300,
        });
        return res.json({ user: thisUser, auth: true, token });
      } else {
        res.status(401).send({ error: "Senha inválida" }).end();
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "Erro na tentativa de login", erro: error });
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

  async disconnectUser(req, res) {
    const { email } = req.body;
    const thisUser = await User.findOne({ email });

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
      expiresIn: 1,
    });

    return res.json({ user: thisUser, auth: true, token });
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
      return res
        .status(400)
        .json({ message: "erro ao salvar no banco de dados", e });
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

  async verifyJWT(req, res) {
    const { token } = await req.body;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).send(decoded);
      } catch (error) {
        return res.status(401).send("Token inválido").end();
      }
    }

    return null;
  }
}

module.exports = UserController;

const User = require("../models/User");
const bcrypt = require("bcrypt");
const sanitizeString = require("../utils/sanitizeString");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

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
      console.log("E-mail não cadastrado")
      return res.status(404).send("E-mail não cadastrado");
    }

    try {
      if (await bcrypt.compare(password, thisUser.password)) {
        const token = jwt.sign(
          { userName: thisUser.userName },
          process.env.SECRET_KEY,
          {
            expiresIn: 300,
          }
        );
        // res.status(200).send({ message: "Login autenticado" });
        console.log("Usuario autenticado com o token: ",token)
        return res.json({ auth: true, token });
      } else {
        // res.status(401).send({ message: "Senha inválida" });
        console.log("Senha invalida")
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

  verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).send("Token inválido").end();

      req.userName = decoded.userName;
      next();
    });
  }
}

module.exports = UserController;

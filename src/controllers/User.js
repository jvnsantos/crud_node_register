const User = require("../models/User");

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json("Usuário já cadastrado");
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
      });

      res.status(201).json(user);
    } catch (e) {
      res.status(400).json("Erro ao cadastrar novo usuário", e);
      process.exit(1);
    }
  },
};

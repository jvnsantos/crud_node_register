const User = require("../models/User");

class UserController {
  async findUser(req, res) {
    const { email } = req.body;

    if (!email) {
      res.status(400).json("E-mail não informado");
    }

    const user = await User.findOne({ email });

    try {
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error });
    }

    // if (!email) {
    //   res.status(400).json("E-mail não informado");
    // }

    // try {
    //   await User.findOne({ email }, (error, result) => {
    //     error ? res.status(400).json(error) : res.status(200).json(result);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

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
      res.status(400);
      process.exit(1);
    }
  }
}

module.exports = UserController;

// module.exports = {
//   // READ - metodo GET
//   async get(req, res) {
//     const { email } = await req.body;

//     if (!email) {
//       res.status(400).json("E-mail não informado");
//     }

//     await User.findOne({ email }, (error, result) => {
//       error ? res.status(400).json(error) : res.status(200).json(result);
//     });
//   },

//   // CREATE - metodo POST
//   async create(req, res) {
//     const { name, email, password } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       res.status(400).json("Usuário já cadastrado");
//     }

//     try {
//       const user = await User.create({
//         name,
//         email,
//         password,
//       });

//       res.status(201).json(user);
//     } catch (e) {
//       res.status(400);
//       process.exit(1);
//     }
//   },
// };

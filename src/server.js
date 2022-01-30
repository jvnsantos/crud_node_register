const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const routes = require("./routes/index.routes");

const app = express();

dotenv.config();
database();

app.use(express.json());

app.use("/api/users", routes);

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});

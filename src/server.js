const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const routes = require("./routes/index.routes");
const cors = require('cors')

const app = express();
app.use(cors())

dotenv.config();
database();

app.use(express.json());

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});

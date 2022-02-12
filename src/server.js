const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const routes = require("./routes/index.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

dotenv.config();
database();

app.use(express.json());

require("./routes/index.routes")(app);
// app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});

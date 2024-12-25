const express = require("express");
const cors = require("cors");
const db = require("./src/config/Database.js");
const dotenv = require("dotenv");
const app = express();
const Auth = require("./src/routes/auth.js");
dotenv.config();
app.use(cors());
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/", Auth);

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

db();

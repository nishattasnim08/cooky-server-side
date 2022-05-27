const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Cooky is Cooking!");
});

app.listen(port, () => {
  console.log("cooking");
});
const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;









const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.mkuxsxx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
 console.log('CONNECTED');
  // perform actions on the collection object
  client.close();
});









app.get("/", (req, res) => {
  res.send("Cooky is Cooking!");
});

app.listen(port, () => {
  console.log("cooking");
});

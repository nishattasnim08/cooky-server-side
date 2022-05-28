const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;










const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.mkuxsxx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const itemCollection = client.db("cookydb").collection("items");
        const orderCollection = client.db("cookydb").collection("order");

        app.get("/items", async (req, res) => {
            const query = {};
            const cursor = await itemCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });


        app.get("/item/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.findOne(query);
            res.send(result);
        });

        app.post("/order", async (req, res) => {
            const newItem = req.body;
            const result = await orderCollection.insertOne(newItem);
            res.send(result);
          });

          
      

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);









app.get("/", (req, res) => {
    res.send("Cooky is Cooking!");
});

app.listen(port, () => {
    console.log("cooking");
});

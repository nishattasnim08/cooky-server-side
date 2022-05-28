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
        const reviewCollection = client.db("cookydb").collection("review");
        const userCollection = client.db("cookydb").collection("user");

        app.get("/items", async (req, res) => {
            const query = {};
            const cursor = await itemCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/order", async (req, res) => {
            const email = req.query.email;
            const query = { userEmail: email };

            const cursor = await orderCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

       

        app.get("/order", async (req, res) => {
            const query = {};
            const cursor = await orderCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/review", async (req, res) => {
            const query = {};
            const cursor = await reviewCollection.find(query);
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

        app.post("/user", async (req, res) => {
            const newItem = req.body;
            const result = await userCollection.insertOne(newItem);
            res.send(result);
        });

        app.post("/review", async (req, res) => {
            const newItem = req.body;
            const result = await reviewCollection.insertOne(newItem);
            res.send(result);
        });

        app.put("/item/:id", async (req, res) => {
            const id = req.params.id;
            const quantity = req.body.quantity;

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateItem = {
                $set: {
                    quantity,
                },
            };
            const result = await itemCollection.updateOne(
                filter,
                updateItem,
                options
            );
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

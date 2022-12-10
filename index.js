const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}
app.use(cors(corsConfig))
app.options("*", cors(corsConfig));



app.use(express.json());

const uri = "mongodb+srv://hms-servers:kOF7R9TYdEW0RTSl@cluster0.avhjzxg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect();
        const userCollection = client.db('userall').collection('user');
        
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = userCollection.insertOne(user);
            res.send(result);
        })

        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })
    }
    finally {


    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello HMS!')
})

app.listen(port, () => {
    console.log(`SMS listening on port ${port}`)
})

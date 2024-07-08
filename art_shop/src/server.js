const express = require('express');
const pg = require('pg');
const cors = require('cors');
const app = express();
//parse request body as json
app.use(express.json())
const connectionString = `postgres://postgres:YKgXp8bZ@localhost:5432/shop`;

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'X-Requested-With']
}));

app.get('/shop', async (req, res) => {
    const client = new pg.Client(connectionString);
    await client.connect();

    const query = 'SELECT * FROM products';
    console.log("Fetch successful");
    const results = await client.query(query);

    res.json(results.rows);

    client.end();
});

app.post('/checkout', async (req, res) => {

    console.log(req.body);
    res.json({requestBody: req.body})


    res.end();
});

app.listen(3000);
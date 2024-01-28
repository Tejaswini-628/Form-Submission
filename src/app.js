const express = require("express");
const path = require('path');
const app = express();
const mysql = require('mysql2');
const hbs = require("hbs");

require("./db/conn");
require("./models/login.js");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));
app.set("view engine", "hbs");
app.set("views", template_path);
app.use(express.static(static_path));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sowmya@333",
    database: "details",
    port: "3306"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server!');
});

app.get("/", (req, res) => {
    res.render("index.hbs");
});

app.post("/submit", async (req, res) => {
    try {
        const { name, regno, date } = req.body;

        connection.query(
            'INSERT INTO form (name, registration_number, date) VALUES (?, ?, ?)',
            [name, regno, date],
            (error, results, fields) => {
                if (error) throw error;
                console.log('Data inserted successfully!');
                res.status(201).render("index.hbs");
            }
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/search", (req, res) => {
    res.render("search.hbs");
});

app.get("/fetchid/:registration_number", (req, res) => {
    const fetchid = req.params.registration_number;
    connection.execute('SELECT * FROM form WHERE registration_number = ?', [fetchid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred while fetching the data.");
        } else {
            const fetchedData = result.map(item => ({ name: item.name, registration_number: item.registration_number, date: item.date }));
            res.send(fetchedData);
        }
    });
});

app.get('/hello', (req, res) => {
    connection.execute('SELECT * FROM form', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred while fetching the data.");
        } else {
            const fetchedData = result.map(item => ({ name: item.name, registration_number: item.registration_number, date: item.date }));
            res.render("hello.hbs", { details: fetchedData });
        }
    });
});

app.get('/data',(req,res) => {
    const fetchid = req.query.registration_number;
    connection.execute('SELECT * FROM form WHERE registration_number = ?', [fetchid], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("An error occurred while fetching the data.");
        } else {
            const fetchedData = result.map(item => ({ name: item.name, registration_number: item.registration_number, date: item.date }));
            res.render("data.hbs", {fetchedData});
        }
    });
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

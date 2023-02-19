const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var app = express();
var port = 3000;

const connection = mysql.createConnection({
    host:"localhost",
    user:"Aminatest",
    password:"your_password",
    database:"school_management_system",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = `SELECT * FROM students WHERE id = ${studentId}`;
    connection.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/students', (req, res) => {
    const student = req.body;
    const sql = 'INSERT INTO students SET ?';
    connection.query(sql, student, (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            const newStudent = { id: result.insertId, ...student };
            res.status(201).json(newStudent);
        }
    });
});
app.listen(port, () => {
    console.log(`School management system backend listening at http://localhost:${port}`);
});


const express = require('express');
const app = express();
const port = 3000;

// Define a route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Define a route to handle POST requests to the /students URL
app.post('/students', (req, res) => {
    const student = req.body;
    console.log('Received student:', student);
    res.send('Student registered successfully!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/school_management_system', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB database');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB database:', error.message);
    });

    const studentSchema = new mongoose.Schema({
        name: String,
        age: Number,
        email: String,
        phone: String
    });
    
    const Student = mongoose.model('Student', studentSchema);

    app.post('/students', (req, res) => {
        const student = new Student({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone
        });
        student.save()
            .then(() => {
                res.status(201).send('Student registered successfully!');
            })
            .catch((error) => {
                res.status(500).send(`Error registering student: ${error.message}`);
            });
    });
    
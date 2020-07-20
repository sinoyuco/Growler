const express = require("express");
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


app.get("/", (req, res) => res.send("Hello World"));

// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => console.log("Connected to MongoDB successfully"))
//     .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
